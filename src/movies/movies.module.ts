import { Module } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MoviesResolver } from './movies.resolver';
import { CommentEntity } from 'src/comments/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([
      CommentEntity,
      UserEntity
    ]),
  ],
  providers: [MoviesResolver, MoviesService,CommentsService]
})
export class MoviesModule {}
