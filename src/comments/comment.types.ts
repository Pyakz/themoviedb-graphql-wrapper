import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class CommentType {
  @Field((type) => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  user: string;

  @Field({ nullable: true })
  movie: string;

  @Field({ nullable: true })
  body: string;

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
  user: string;

  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  movie: string;
}
