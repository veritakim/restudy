import { AppService } from './app.service';
import { Resolver, Query } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => String)
  fetchBoards() {
    return '페치보드 완료';
  }
}
