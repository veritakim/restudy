import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsModule } from './api/products/products.service';

@Module({
  imports: [
    BoardsModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql' /**process.env.DATABASE_TYPE as 'mysql'*/,
      host: 'localhost' /*process.env.DATABASE_HOST*/,
      port: 3306,
      username: 'root' /**process.env.DATABASE_USERNAME*/,
      password: 'js0205' /**process.env.DATABASE_PASSWORD*/,
      database: 'myproject05' /**process.env.DATABASE_DATABASE*/,
      entities: [__dirname + '/api/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
  ],
})
export class AppModule {}
