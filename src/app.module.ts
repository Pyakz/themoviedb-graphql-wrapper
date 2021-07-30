import { MONGODB_PROD, MONGODB_DEV } from './constant';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsModule } from './comments/comments.module';
import { UserModule } from './user/user.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
require('dotenv').config();

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      introspection: true,
      installSubscriptionHandlers: true,
      context: ({ req }) => ({
        headers: req?.headers,
      }),
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message || error.message,
        };
        return graphQLFormattedError;
      },
    }),

    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.NODE_ENV ? MONGODB_PROD : MONGODB_DEV,
      synchronize: process.env.NODE_ENV ? false : true,
      useUnifiedTopology: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
    }),
    MoviesModule,
    CommentsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
