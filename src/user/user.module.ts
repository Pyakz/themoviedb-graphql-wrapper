import { SECRET } from 'src/constant';
import { JwtModule } from '@nestjs/jwt';
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
    JwtModule.register({
      secret: SECRET,
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [UserResolver, UserService],
  exports:[UserService]
})
export class UserModule {}
