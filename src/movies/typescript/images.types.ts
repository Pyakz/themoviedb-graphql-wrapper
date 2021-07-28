import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Images {
  @Field((types) => [Backdrop], { nullable: true })
  backdrops: Backdrop[];

  @Field({ nullable: true })
  id: number;

  @Field((types) => [Backdrop], { nullable: true })
  logos: Backdrop[];

  @Field((types) => [Backdrop], { nullable: true })
  posters: Backdrop[];
}

@ObjectType()
export class Backdrop {
  @Field({ nullable: true })
  aspect_ratio: number;

  @Field({ nullable: true })
  height: number;

  @Field({ nullable: true })
  iso_639_1: null | string;

  @Field({ nullable: true })
  file_path: string;

  @Field({ nullable: true })
  vote_average: number;

  @Field({ nullable: true })
  vote_count: number;

  @Field({ nullable: true })
  width: number;
}
