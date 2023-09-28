import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardsService {
  // constructor(
  //   @InjectRepository(Board)
  //   private readonly boardRepository: Repository<Board>,
  // ) {}

  getHello(): string {
    return 'Hello World!';
  }

  // async findAll() {
  //   const result = await this.boardRepository.find();
  //   return result;
  // }
}
