import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserAccount, UserType } from './user.types';
import { InjectRepository } from '@nestjs/typeorm';

const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepo: Repository<UserEntity>,
  ) {}

  async findOne(id: string): Promise<UserType | GraphQLError> {
    try {
      const user = await this.UserRepo.findOne(id);
      if (!user) {
        throw new GraphQLError('Cannot find user');
      }
      return user;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findByUserName(username: string): Promise<boolean> {
    try {
      const user = await this.UserRepo.findOne({
        where: { username: username },
      });
      if (!user) {
        return false;
      }
      return true;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async create(createUserInput: CreateUserAccount) {
    const { username, password } = createUserInput;

    try {
      const findFirst = await this.findByUserName(username);
      if (findFirst) {
        throw new GraphQLError('Username is already taken');
      } else {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);
        const mutatedInputs = {
          username,
          password: hashedPassword,
        };

        const newUser = this.UserRepo.create({
          ...mutatedInputs,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return await newUser.save();
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }

    // const validPassword = await bcrypt.compare(password,hashedPassword)
  }



  async update(id: string, body: CreateUserAccount) {
    const findUser = this.findOne(id);
    let newBody = {
      ...body,
    };
    if (body.password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(body.password, salt);
      newBody = {
        ...body,
        password: hashedPassword,
      };
    }
    try {
      if (findUser) {
        await this.UserRepo.update(id, {
          ...findUser,
          ...newBody,
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

  async remove(id: string) {
    try {
      const findOne = this.findOne(id);
      if (findOne) {
        await this.UserRepo.delete(id);
        return {
          message: 'Deleted',
        };
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }
}
