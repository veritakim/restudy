import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Resolver, Mutation, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  query() {
    return '쿼리입니다';
  }

  @Mutation(() => String)
  login() {
    return '로그인 완료';
  }
}
