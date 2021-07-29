import { AuthGuard } from './../auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { Updated } from 'src/comments/comment.types';
import { UserService } from './user.service';

import { CreateUserAccount, UserType } from './user.types';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  createUser(@Args('createUserInput') createUserInput: CreateUserAccount) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserType, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Updated)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('update', { type: () => CreateUserAccount })
    updateUserInput: CreateUserAccount,
    @Context('user') currentUser: UserType,
  ) {
    return this.userService.update(id, updateUserInput, currentUser);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Updated)
  removeUser(
    @Args('id', { type: () => String }) id: string,
    @Context('user') currentUser: UserType,
  ) {
    return this.userService.remove(id, currentUser);
  }
}
