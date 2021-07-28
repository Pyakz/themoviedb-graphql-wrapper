import { registerEnumType } from '@nestjs/graphql';

export enum SORT_BY {
  POPULARITY_ASC = 'popularity.asc',
  POPULARITY_DESC = 'popularity.desc',
  RELEASE_DATE_ASC = 'release_date.asc',
  RELEASE_DATE_DESC = 'release_date.desc',
  REVENUE_ASC = 'revenue.asc',
  REVENUE_DESC = 'revenue.desc',
  VOTE_AVERAGE_ASC = 'vote_average.asc',
  VOTE_AVERAGE_DESC = 'vote_average.desc',
  VOTE_COUNT_ASC = 'vote_count.asc',
  VOTE_COUNT_DESC = 'vote_count.desc',
}

export enum GENRES {
  Action = '28',
  Adventure = '12',
  Animation = '16',
  Comedy = '35',
  Crime = '80',
  Documentary = '99',
  Drama = '18',
  Family = '10751',
  Fantasy = '14',
  History = '36',
  Horror = '27',
  Music = '10402',
  Mystery = '9648',
  Romance = '10749',
  Science_Fiction = '878',
  Movie = '10770',
  Thriller = '53',
  War = '10752',
  Western = '37',
}

export enum Department {
  Acting = 'Acting',
  Art = 'Art',
  Camera = 'Camera',
  CostumeMakeUp = 'Costume & Make-Up',
  Crew = 'Crew',
  Directing = 'Directing',
  Editing = 'Editing',
  Lighting = 'Lighting',
  Production = 'Production',
  Sound = 'Sound',
  VisualEffects = 'Visual Effects',
  Writing = 'Writing',
}

registerEnumType(Department, {
  name: 'department',
  description: 'Department',
});

registerEnumType(SORT_BY, {
  name: 'sort_by',
  description: 'Sort Values',
});

registerEnumType(GENRES, {
  name: 'genre',
  description: 'Genres',
});
