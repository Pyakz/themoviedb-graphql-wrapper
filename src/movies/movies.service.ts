import { InjectRepository } from '@nestjs/typeorm';
import { Backdrop, Images } from './typescript/images.types';
import { IMAGE_NOT_FOUND, PERSON_PROFILE_PLACEHOLDER } from './../constant';
import { Discover, Result } from './typescript/movies.types';
import { Movie, MoviesParameters, Results } from './typescript/movies.types';
import { GraphQLError } from 'graphql';
import { Injectable } from '@nestjs/common';
import TMDB from './movies.axios';
import { Cast, CastElement } from './typescript/cast.types';

@Injectable()
export class MoviesService {

  async findMany({ genre, sort_by, page }: MoviesParameters): Promise<Results> {
    try {
      const req = await TMDB.get(
        `/discover/movie?include_adult=true&with_genres=${genre}&sort_by=${sort_by}&page=${
          page ? page : 1
        }`,
      );
      const response = await req.data;
      const mutatedResponse = {
        ...response,
        results: response.results.map((movie: Movie) => {
          return {
            ...movie,
            backdrop_path:
              movie.backdrop_path === null
                ? IMAGE_NOT_FOUND
                : movie.backdrop_path,
            poster_path:
              movie.poster_path === null ? IMAGE_NOT_FOUND : movie.poster_path,
          };
        }),
      };
      return mutatedResponse;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findByQuery(query: string, page: number): Promise<Results> {
    try {
      const req = await TMDB.get(
        `/search/movie?&query=${query}&page=${page ? page : 1}`,
      );
      const response = await req.data;
      const mutatedResponse = {
        ...response,
        results: response.results.map((movie: Movie) => {
          return {
            ...movie,
            backdrop_path:
              movie.backdrop_path === null
                ? IMAGE_NOT_FOUND
                : movie.backdrop_path,
            poster_path:
              movie.poster_path === null ? IMAGE_NOT_FOUND : movie.poster_path,
          };
        }),
      };
      return mutatedResponse;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findOne(id: number): Promise<Movie> {
    try {
      const req = await TMDB.get(`/movie/${id}?&append_to_response=videos`);
      const data = await req.data;
      const mutatedMovie = {
        ...data,
        poster_path: 'https://image.tmdb.org/t/p/w342' + data.poster_path,
        videos: {
          ...data.videos,
          results: data.videos.results.map((video: Result) => {
            return {
              ...video,
              key: `https://www.youtube.com/watch?v=${video.key}`,
            };
          }),
        },
      };
      return mutatedMovie;
    } catch (error) {
      throw new GraphQLError(`Movie with ID: [${id}] is not found`);
    }
  }

  async findSimilar(id: number, page: number): Promise<Result> {
    try {
      const req = await TMDB.get(
        `/movie/${id}/similar?&page=${page ? page : 1}`,
      );
      const response = await req.data;
      const mutatedResponse = {
        ...response,
        results: response.results.map((movie: Movie) => {
          return {
            ...movie,
            backdrop_path:
              movie.backdrop_path === null
                ? IMAGE_NOT_FOUND
                : movie.backdrop_path,
            poster_path:
              movie.poster_path === null ? IMAGE_NOT_FOUND : movie.poster_path,
          };
        }),
      };
      return mutatedResponse;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findCast(id: number): Promise<Cast> {
    try {
      const req = await TMDB.get(`/movie/${id}/credits`);
      const response = await req.data;
      return response;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findImages(id: number): Promise<Images> {
    try {
      const req = await TMDB.get(`/movie/${id}/images?`);
      const response = await req.data;
      const mutatedResponse = {
        ...response,
        backdrops: response.backdrops.map((backdrop: Backdrop) => {
          return {
            file_path: `https://image.tmdb.org/t/p/w780/${backdrop.file_path}`,
          };
        }),
      };
      return mutatedResponse;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findPerson(id: number): Promise<CastElement> {
    try {
      const req = await TMDB.get(`/person/${id}`);
      const response = await req.data;
      const mutatedPerson = {
        ...response,
        profile_path:
          response.profile_path === null
            ? PERSON_PROFILE_PLACEHOLDER
            : response.profile_path,
      };
      return mutatedPerson;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }

  async findByDiscover({ category, page }: Discover): Promise<Results> {
    try {
      const req = await TMDB.get(
        `movie/${category}?include_adult=true&page=${page ? page : 1}`,
      );
      const response = await req.data;
      const mutatedResponse = {
        ...response,
        results: response.results.map((movie: Movie) => {
          return {
            ...movie,
            backdrop_path:
              movie.backdrop_path === null
                ? IMAGE_NOT_FOUND
                : movie.backdrop_path,
            poster_path:
              movie.poster_path === null ? IMAGE_NOT_FOUND : movie.poster_path,
          };
        }),
      };
      return mutatedResponse;
    } catch (error) {
      throw new GraphQLError(error.message);
    }
  }


}
