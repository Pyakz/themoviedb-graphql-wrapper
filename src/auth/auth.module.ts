import { Module } from '@nestjs/common';
import { JwtModule, } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SECRET } from 'src/constant';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthResolver } from './auth.resolver';

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
  providers: [AuthResolver, UserService],
})
export class AuthModule {}
