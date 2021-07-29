import { UserType } from './../user/user.types';
import { GraphQLError } from 'graphql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from './comment.entity';
import { CommentInput, Updated } from './comment.types';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly CommentRepo: Repository<CommentEntity>,
  ) {}

  async create(
    CommentInput: CommentInput,
    currentUser: UserType,
  ): Promise<CommentEntity> {
    const { body, movie } = CommentInput;
    try {
      const commentCreated = this.CommentRepo.create({
        user: currentUser,
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

  async findOne(id: string): Promise<CommentEntity> {
    try {
      const comment = await this.CommentRepo.findOne(id);
      if (comment) {
        return comment;
      }
      throw new GraphQLError('Cannot find comment');
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async update(
    id: string,
    body: string,
    currentUser: UserType,
  ): Promise<Updated> {
    const foundComment = await this.findOne(id);
    if (foundComment.user._id !== currentUser._id) {
      throw new GraphQLError('Unathorized');
    }
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

  async remove(id: string, currentUser: UserType): Promise<Updated> {
    const foundComment = await this.findOne(id);
    if (foundComment.user._id !== currentUser._id) {
      throw new GraphQLError('Unathorized');
    }
    try {
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
