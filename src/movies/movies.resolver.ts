import { Cast, CastElement } from './typescript/cast.types';
import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { MoviesService } from './movies.service';
import { Movie, MoviesParameters, Results } from './typescript/movies.types';

@Resolver(() => Movie)
export class MoviesResolver {
  constructor(private readonly moviesService: MoviesService) {}

  @Query(() => Results, { name: 'movies' })
  findMany(
    @Args('params', { type: () => MoviesParameters }) params:MoviesParameters
  ) {
    return this.moviesService.findMany(params);
  }

  @Query(() => Movie, { name: 'movie' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.findOne(id);
  }

  
  @Query(() => CastElement, { name: 'person' })
  findPerson(@Args('id', { type: () => Int }) id: number) {
    return this.moviesService.findPerson(id);
  }

  @ResolveField(() => Cast, {name:'casts'})
  async cast(@Parent() movie: Movie) {
    const { id } = movie;
    return this.moviesService.findCast(id);
  }

  @Mutation(() => Movie)
  updateMovie(@Args('updateMovieInput') updateMovieInput: number) {
    return this.moviesService.update(updateMovieInput);
  }
}
