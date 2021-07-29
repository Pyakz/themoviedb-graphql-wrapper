import { Cast, CastElement } from './typescript/cast.types';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import {
  Discover,
  Movie,
  MoviesParameters,
  Results,
} from './typescript/movies.types';
import { Images } from './typescript/images.types';
import { CommentType } from 'src/comments/comment.types';
import { CommentsService } from 'src/comments/comments.service';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(
    private readonly moviesService: MoviesService,
    private readonly commentsService: CommentsService,
  ) {}

  @Query(() => Results, { name: 'movies', description: 'List of Movies' })
  findMany(
    @Args('params', { type: () => MoviesParameters }) params: MoviesParameters,
  ) {
    return this.moviesService.findMany(params);
  }
  // popular
  // top_rated
  // upcoming
  @Query(() => Results, {
    name: 'discover',
    description: 'Top Rated, Popular, Upcoming',
  })
  findByDiscover(@Args('params', { type: () => Discover }) params: Discover) {
    return this.moviesService.findByDiscover(params);
  }

  @Query(() => Results, { name: 'search', description: 'Search by keywords' })
  findByQuery(
    @Args('query', { type: () => String }) query: string,
    @Args('page', { type: () => Int }) page: number,
  ) {
    return this.moviesService.findByQuery(query, page);
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.findOne(id);
  }

  @Query(() => CastElement, {
    name: 'person',
    description: 'Person or any actors',
  })
  findPerson(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.findPerson(id);
  }

  @Query(() => Results, { name: 'similar', description: 'Similar Movies ' })
  async similar(
    @Args('page', { type: () => Int }) page: number,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.moviesService.findSimilar(id, page);
  }

  @ResolveField(() => Images, {
    name: 'images',
    description: 'Images of given movie',
  })
  async similarMovies(@Parent() movie: Movie) {
    const { id } = movie;
    return this.moviesService.findImages(id);
  }

  @ResolveField(() => Cast, { name: 'casts' })
  async cast(@Parent() movie: Movie) {
    const { id } = movie;
    return this.moviesService.findCast(id);
  }

  // Comments Related
  @ResolveField(() => CommentType, { name: 'comments' })
  async comments(@Parent() movie: Movie) {
    const { id } = movie;
    return this.commentsService.findComments(id);
  }

  // To be determined
  // @ResolveField(() => Results, { name: 'similar_movies' })
  // async similarMovies(
  //   @Parent() movie: Movie,
  //   @Args('page', { type: () => Int }) page: number,
  // ) {
  //   const { id } = movie;
  //   return this.moviesService.findSimilar(id, page);
  // }
}
