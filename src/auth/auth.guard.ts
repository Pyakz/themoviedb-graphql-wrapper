import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GraphQLError } from 'graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = await GqlExecutionContext.create(context).getContext();
    if (!ctx.headers.authorization) {
      return false;
    }
    ctx.user = await this.validateToken(ctx.headers.authorization); // We can access user now using @Context anywhere in our Resolvers
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new GraphQLError('Invalid Token');
    }
    const token = auth.split(' ')[1];
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new GraphQLError('Invalid Token');
    }
  }
}
