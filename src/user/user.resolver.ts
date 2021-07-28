import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Updated } from 'src/comments/comment.types';
import { UserService } from './user.service';

import { CreateUserAccount, UserType} from './user.types';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserType)
  createUser(@Args('createUserInput') createUserInput: CreateUserAccount) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserType], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => UserType, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => Updated)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('update', { type: () => CreateUserAccount }) updateUserInput: CreateUserAccount) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Updated)
  removeUser(
    @Args('id', { type: () => String }) id: string,
  ) {
    return this.userService.remove(id);
  }
}
