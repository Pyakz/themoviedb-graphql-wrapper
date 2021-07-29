import { GraphQLError } from 'graphql';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserAccount, JWT, UserType } from './user.types';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Updated } from 'src/comments/comment.types';
const bcrypt = require('bcryptjs');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findOne(id: string): Promise<UserType> {
    try {
      const user = await this.UserRepo.findOne(id);
      if (user) {
        return user;
      }
      throw new GraphQLError('Cannot find user');
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findByUserName(username: string): Promise<UserType> {
    try {
      const user = await this.UserRepo.findOne({
        where: { username: username },
      });
      if (user) {
        return user;
      }
      throw new GraphQLError('Username does not exists.');
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async create(createUserInput: CreateUserAccount) {
    const { username, password } = createUserInput;
    const user = await this.UserRepo.findOne({
      where: { username: username },
    });
    try {
      if (user) {
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
  }

  //---------------------------- User can only update their own ----------------------------//

  async update(
    id: string,
    body: CreateUserAccount,
    currentUser: UserType,
  ): Promise<Updated> {
    const findUser = await this.findOne(id);
    if (currentUser._id !== findUser._id) {
      throw new GraphQLError('Unathorized');
    }
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
          message: 'Updated Successfully',
        };
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async remove(id: string, currentUser: UserType): Promise<Updated> {
    const findOne = await this.findOne(id);
    if (currentUser._id !== findOne._id) {
      throw new GraphQLError('Unathorized');
    }
    try {
      if (findOne) {
        await this.UserRepo.delete(id);
        return {
          message: 'Deleted Successfully',
        };
      }
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  //---------------------------- Generate a JWT token ----------------------------//
  createToken(id: string, username: string): JWT {
    return {
      access_token: this.jwtService.sign({ _id: id, username }),
    };
  }

  //---------------------------- UserLogin ---------------------------- //
  async login(username: string, password: string): Promise<JWT> {
    const user = await this.findByUserName(username);

    const decodedPassword: boolean = await bcrypt.compareSync(
      password.toLowerCase(),
      user.password,
    );

    if (decodedPassword) {
      const token = this.createToken(user._id, user.username);
      return token;
    } else {
      throw new GraphQLError('Password is incorrect');
    }
  }
}
