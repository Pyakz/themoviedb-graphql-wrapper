import { UserService } from 'src/user/user.service';
import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { JWT } from 'src/user/user.types';

@Resolver()
export class AuthResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => JWT, { name: 'login' })
  createUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ): Promise<JWT>  {
    return this.userService.login(username, password);
  }
}
