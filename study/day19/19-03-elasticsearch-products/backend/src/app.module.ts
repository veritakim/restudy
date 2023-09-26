import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './apis/auths/auths.module';
import { BoardsModule } from './apis/boards/boards.module';
import { FilesModule } from './apis/files/files.module';
import { PointsTrancsactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { ProductsModule } from './apis/products/products.module';
import { ProductCategoriesModule } from './apis/productsCategories/productCategories.module';
import { UsersModule } from './apis/users/users.module';
import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { SELF_DECLARED_DEPS_METADATA } from '@nestjs/common/constants';

@Module({
  imports: [
    BoardsModule,
    ProductsModule,
    ProductCategoriesModule,
    UsersModule,
    AuthsModule,
    PointsTrancsactionsModule,
    FilesModule,
    CacheModule.register(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_DOCKER_HOST,
      port: 3306,
      username: process.env.DATABASE_DOCKER_USERNAME,
      password: process.env.DATABASE_DOCKER_PASSWORD,
      database: process.env.DATABASE_DOCKER_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://my-redis:6379',
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
