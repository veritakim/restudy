import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';

@Resolver()
export class AuthsResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly authsService: AuthsService, //
  ) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
  ) {
    // 로그인 ( DB에서 유저 찾기 )
    const user = await this.usersService.findOne({ email });
    // ? 일치하는 유저가 없다면 에러 던지기
    if (!user)
      throw new UnprocessableEntityException('등록되지 않은 이메일입니다.');
    // 일치 유저가 있다면 비밀번호가 틀렸다면?
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인해주세요');
    // 다 맞은 경우 accessToken을 브라우저에 전달
    return this.authsService.getAccessToken({ user });
  }
}
