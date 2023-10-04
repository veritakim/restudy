import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @MessagePattern({ qqq: '로그인실행' })
  login(data) {
    // 실제 로그인 하기
    console.log(data);
    return '로그인 성공';
  }
}
