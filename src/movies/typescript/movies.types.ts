import { Cast } from './cast.types';
import { ObjectType, Field, InputType } from '@nestjs/graphql';
import { GENRES, SORT_BY } from './movies.enums';

@InputType()
export class MoviesParameters {
  @Field((type) => SORT_BY)
  sort_by: SORT_BY;

  @Field((type) => GENRES)
  genre: GENRES;

  @Field()
  page: number;
}

@ObjectType()
export class BelongsToCollection {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  poster_path: string;

  @Field({ nullable: true })
  backdrop_path: string;
}

@ObjectType()
export class Genre {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
export class ProductionCompany {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  logo_path: null | string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  origin_country: string;
}

@ObjectType()
export class ProductionCountry {
  @Field({ nullable: true })
  iso_3166_1: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
export class SpokenLanguage {
  @Field({ nullable: true })
  english_name: string;

  @Field({ nullable: true })
  iso_639_1: string;

  @Field({ nullable: true })
  name: string;
}

@ObjectType()
export class Videos {
  @Field((type) => [Result], { nullable: true })
  results: Result[];
}

@ObjectType()
export class Result {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  iso_639_1: string;

  @Field({ nullable: true })
  iso_3166_1: string;

  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  site: string;

  @Field({ nullable: true })
  size: number;

  @Field({ nullable: true })
  type: string;
}

@ObjectType()
export class Movie {
  @Field((type) => Cast, { nullable: true })
  casts: Cast;

  @Field({ nullable: true })
  adult: boolean;

  @Field({ nullable: true })
  backdrop_path: string;

  @Field((type) => BelongsToCollection, { nullable: true })
  belongs_to_collection: BelongsToCollection;

  @Field({ nullable: true })
  budget: number;

  @Field((type) => [Genre], { nullable: true })
  genres: Genre[];

  @Field({ nullable: true })
  homepage: string;

  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  imdb_id: string;

  @Field({ nullable: true })
  original_language: string;

  @Field({ nullable: true })
  original_title: string;

  @Field({ nullable: true })
  overview: string;

  @Field({ nullable: true })
  popularity: number;

  @Field({ nullable: true })
  poster_path: string;

  @Field((type) => [ProductionCompany], { nullable: true })
  production_companies: ProductionCompany[];

  @Field((type) => [ProductionCountry], { nullable: true })
  production_countries: ProductionCountry[];

  @Field({ nullable: true })
  release_date: string;

  @Field({ nullable: true })
  revenue: number;

  @Field({ nullable: true })
  runtime: number;

  @Field((type) => [SpokenLanguage], { nullable: true })
  spoken_languages: SpokenLanguage[];

  @Field({ nullable: true })
  status: string;

  @Field({ nullable: true })
  tagline: string;

  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  video: boolean;

  @Field({ nullable: true })
  vote_average: number;

  @Field({ nullable: true })
  vote_count: number;

  @Field((type) => Videos, { nullable: true })
  videos: Videos;
}

@ObjectType()
export class Results {
  @Field({ nullable: true })
  page: number;

  @Field((type) => [Movie], { nullable: true })
  results: Movie[];

  @Field({ nullable: true })
  total_pages: number;

  @Field({ nullable: true })
  total_results: number;
}

// export interface Movies {
//   adult: boolean;
//   backdrop_path: string;
//   belongs_to_collection: BelongsToCollection;
//   budget: number;
//   genres: Genre[];
//   homepage: string;
//   id: number;
//   imdb_id: string;
//   original_language: string;
//   original_title: string;
//   overview: string;
//   popularity: number;
//   poster_path: string;
//   production_companies: ProductionCompany[];
//   production_countries: ProductionCountry[];
//   release_date: string;
//   revenue: number;
//   runtime: number;
//   spoken_languages: SpokenLanguage[];
//   status: string;
//   tagline: string;
//   title: string;
//   video: boolean;
//   vote_average: number;
//   vote_count: number;
//   videos: Videos;
// }

// export interface BelongsToCollection {
//   id: number;
//   name: string;
//   poster_path: string;
//   backdrop_path: string;
// }

// export interface Genre {
//   id: number;
//   name: string;
// }

// export interface ProductionCompany {
//   id: number;
//   logo_path: null | string;
//   name: string;
//   origin_country: string;
// }

// export interface ProductionCountry {
//   iso_3166_1: string;
//   name: string;
// }

// export interface SpokenLanguage {
//   english_name: string;
//   iso_639_1: string;
//   name: string;
// }

// export interface Videos {
//   results: Result[];
// }

// export interface Result {
//   id: string;
//   iso_639_1: string;
//   iso_3166_1: string;
//   key: string;
//   name: string;
//   site: string;
//   size: number;
//   type: string;
// }

// export interface Results {
//     page:          number;
//     results:       Result[];
//     total_pages:   number;
//     total_results: number;
// }

// export interface Result {
//     adult:             boolean;
//     backdrop_path:     string;
//     genre_ids:         number[];
//     id:                number;
//     original_language: OriginalLanguage;
//     original_title:    string;
//     overview:          string;
//     popularity:        number;
//     poster_path:       string;
//     release_date:      string;
//     title:             string;
//     video:             boolean;
//     vote_average:      number;
//     vote_count:        number;
// }

// export enum OriginalLanguage {
//     En = "en",
//     Fr = "fr",
//     Ja = "ja",
// }
