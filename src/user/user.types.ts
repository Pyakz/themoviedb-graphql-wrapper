import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType()
export class JWT {
  @Field({ nullable: true })
  access_token:string
}

@ObjectType()
export class UserType {
  @Field({ nullable: true })
  _id: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;


  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@InputType()
export class CreateUserAccount {
  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  password: string;
}

