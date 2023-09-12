import { Module } from '@nestjs/common';
import { BoardsResolver } from '../boards/boards.resolver';
import { BoardsService } from '../boards/boards.service';

@Module({
  // imports: [],
  // controllers: [],
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
