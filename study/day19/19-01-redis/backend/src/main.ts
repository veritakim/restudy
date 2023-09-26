import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // class-validation 검증기능
  app.useGlobalPipes(new ValidationPipe());
  // http-exception.filter 등록하기
  app.useGlobalFilters(new HttpExceptionFilter());
  // graphql-upload 사용가능하도록
  app.use(graphqlUploadExpress());
  await app.listen(3000);
}
bootstrap();
