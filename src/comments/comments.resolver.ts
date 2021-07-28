import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CommentInput, CommentType, Updated } from './comment.types';
import { CommentsService } from './comments.service';

@Resolver(() => CommentType)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => CommentType)
  createComment(@Args('createComment') createComment: CommentInput) {
    return this.commentsService.create(createComment);
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
  updateComment(@Args('id') id: string, @Args('body') body: string) {
    return this.commentsService.update(id, body);
  }

  @Mutation(() => Updated)
  removeComment(@Args('id', { type: () => String }) id: string) {
    return this.commentsService.remove(id);
  }
}
