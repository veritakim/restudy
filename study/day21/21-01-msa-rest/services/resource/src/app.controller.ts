import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

const result = [
  { writer: '해리', title: '마법학교' },
  { writer: '위즐리', title: '마법은행' },
  { writer: '헤르미온느', title: '마법노동자' },
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @MessagePattern({ cmd: 'fetchBoards' })
  fetchBoard() {
    // 실제 데이터 조회하기
    return result;
  }
}
