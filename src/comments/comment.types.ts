import { UserType } from './../user/user.types';
import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class CommentType {
  @Field((type) => ID, { nullable: true })
  _id: string;

  @Field((type) => UserType)
  user: UserType;

  @Field({ nullable: true })
  movie: string;

  @Field({ nullable: true })
  body: string;

  @Field()
  likes: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class Updated {
  @Field({ nullable: true })
  message: string;
}

@InputType()
export class CommentInput {
  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  movie: number;

  @Field({ defaultValue: 0 })
  likes: number;
}
