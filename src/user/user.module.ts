import { UserEntity } from './user.entity';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[ 
    TypeOrmModule.forFeature([
      UserEntity
    ]),
  ],
  providers: [UserResolver, UserService]
})
export class UserModule {}
