import { UserType } from './../user/user.types';
import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, Context, Subscription } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { CommentInput, CommentType, Updated } from './comment.types';
import { CommentsService } from './comments.service';
import { PubSub, PubSubEngine,  } from 'graphql-subscriptions';
const pubSub:PubSubEngine = new PubSub();

@Resolver(() => CommentType)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => CommentType)
 async createComment(
    @Args('createComment') createComment: CommentInput,
    @Context('user') currentUser: UserType,
  ) {
    const newComment = await this.commentsService.create(createComment, currentUser);
    pubSub.publish('newComment', { newComment });
    return newComment
  }

  @Query(() => [CommentType], { name: 'comments' })
  findAll(@Args('movieID') movieID: number) {
    return this.commentsService.findComments(movieID); // Find all comments of this movie
  }

  @Query(() => CommentType, { name: 'comment' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Updated)
  @UseGuards(AuthGuard)
  updateComment(
    @Args('id') id: string,
    @Args('body') body: string,
    @Context('user') currentUser: UserType,
  ) {
    return this.commentsService.update(id, body, currentUser);
  }

  @Mutation(() => Updated)
  @UseGuards(AuthGuard)
  removeComment(
    @Args('id', { type: () => String }) id: string,
    @Context('user') currentUser: UserType,
  ) {
    return this.commentsService.remove(id, currentUser);
  }

  @Subscription(returns => CommentType, {
    name: 'newComment',
    filter(payload, variables) {
      return payload.newComment.movie === variables.id;
    }
  })
  newComment(@Args('id') id: number) {
    return pubSub.asyncIterator('newComment');
  }
  
}
