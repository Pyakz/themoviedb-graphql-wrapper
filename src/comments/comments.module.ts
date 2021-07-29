import { SECRET } from './../constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { CommentEntity } from './comment.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([
      CommentEntity
    ]),
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule
  ],
  providers: [CommentsResolver, CommentsService]
})
export class CommentsModule {}
