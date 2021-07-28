import { GraphQLError } from 'graphql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentInput, CommentType, Updated } from './comment.types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentRepo: Repository<CommentEntity>,
  ) {}
  async create(CommentInput: CommentInput): Promise<CommentType> {
    const { user, body, movie } = CommentInput;

    try {
      const commentCreated = this.CommentRepo.create({
        user: user,
        body: body,
        movie: movie,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const created = await commentCreated.save();

      return created;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findComments(movieID: number) {
    try {
      const commentsInThisMovie = await this.CommentRepo.find({
        where: { movie: movieID.toString() },
      });
      return commentsInThisMovie;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findOne(id: string): Promise<CommentType | GraphQLError> {
    try {
      const comment = await this.CommentRepo.findOne(id);
      if (!comment) {
        throw new GraphQLError('Cannot find comment');
      }
      return comment;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async update(id: string, body: string): Promise<Updated | GraphQLError> {
    const foundComment = this.findOne(id);

    try {
      if (foundComment) {
        await this.CommentRepo.update(id, {
          body,
          updatedAt: new Date(),
        });
        return {
          message: 'Updated',
        };
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async remove(id: string): Promise<Updated | GraphQLError> {
    try {
      const foundComment = this.findOne(id);
      if (foundComment) {
        await this.CommentRepo.delete(id);
        return {
          message: 'Deleted',
        };
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
