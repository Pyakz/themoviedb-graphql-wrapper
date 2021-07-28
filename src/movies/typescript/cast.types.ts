import { Field, ObjectType } from '@nestjs/graphql';
import { Department } from './movies.enums';

@ObjectType()
export class Cast {
  @Field({ nullable: true })
  id: number;

  @Field((type) => [CastElement], { nullable: true })
  cast: CastElement[];

  @Field((type) => [CastElement], { nullable: true })
  crew: CastElement[];
}

@ObjectType()
export class CastElement {
  @Field({ nullable: true })
  adult: boolean;

  @Field({ nullable: true })
  gender: number;

  @Field({ nullable: true })
  id: number;

  @Field((type) => Department, { nullable: true })
  known_for_department: Department;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  original_name: string;

  @Field({ nullable: true })
  popularity: number;

  @Field({ nullable: true })
  profile_path: null | string;

  @Field({ nullable: true })
  cast_id?: number;

  @Field({ nullable: true })
  character?: string;

  @Field({ nullable: true })
  credit_id: string;

  @Field({ nullable: true })
  order?: number;

  @Field((type) => Department, { nullable: true })
  department?: Department;

  @Field({ nullable: true })
  job?: string;
}

