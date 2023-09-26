import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardsService } from './boards.service';
// import { Board } from './entities/board.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { CreateBoardInput } from './dto/createBoard.input';
import { Cache } from 'cache-manager';

@Resolver()
export class BoardsResolver {
  constructor(
    private readonly boardsService: BoardsService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  // @Query(() => [Board])
  // fetchBoards() {
  //   return this.boardsService.findAll();
  // }

  @Mutation(() => String)
  async createBoard(
    @Args({ name: 'writer', nullable: true }) writer: string, //
    @Args('title') title: string,
    @Args('contents') contents: string,
    @Args('createBoardInput') createBoardInput: CreateBoardInput,
  ) {
    // 1, 캐시에 등록하는 연습
    await this.cacheManager.set('bbb', createBoardInput, { ttl: 0 });

    const mycache = await this.cacheManager.get('aaa');
    console.log(mycache);

    return '캐시 테스트 중';
  }
}
