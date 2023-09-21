import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from './apis/auths/auths.module';
import { BoardsModule } from './apis/boards/boards.module';
import { PointsTrancsactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { ProductsModule } from './apis/products/products.module';
import { ProductCategoriesModule } from './apis/productsCategories/productCategories.module';
import { UsersModule } from './apis/users/users.module';

@Module({
  imports: [
    BoardsModule,
    ProductsModule,
    ProductCategoriesModule,
    UsersModule,
    AuthsModule,
    PointsTrancsactionsModule,
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
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
