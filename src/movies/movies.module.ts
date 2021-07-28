import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { CommentEntity } from 'src/comments/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([
      CommentEntity
    ]),
  ],
  providers: [MoviesResolver, MoviesService,CommentsService]
})
export class MoviesModule {}
