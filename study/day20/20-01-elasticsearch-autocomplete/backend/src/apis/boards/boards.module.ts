import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';
import { Board } from './entities/board.entity';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([
  //     Board, //
  //   ]),
  // ],
  providers: [BoardsResolver, BoardsService],
})
export class BoardsModule {}
