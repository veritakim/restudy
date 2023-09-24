import {
  Injectable,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { AuthsService } from './auths.service';
import * as bcrypt from 'bcrypt';
import { IContext } from 'src/commons/type/context';
import { GqlAuthRefreshGuard } from 'src/commons/auth/gql-auth.refresh.guard';

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
    @Context() context: IContext,
  ) {
    const user = await this.usersService.findOne({ email });
    if (!user)
      throw new UnprocessableEntityException('등록되지 않은 이메일입니다.');

    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth)
      throw new UnprocessableEntityException('비밀번호를 확인해주세요');

    // refreshToken을 만들어서
    // FE 브라우저 쿠키에 저장해서 보내주기
    this.authsService.setRefreshToken({ user, res: context.res });

    return this.authsService.getAccessToken({ user });
  }

  // refreshToken이 정상인지
  @UseGuards(GqlAuthRefreshGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @Context() context: IContext, //
  ) {
    // user는 refreshToken에 있다
    return this.authsService.getAccessToken({ user: context.req.user });
  }
}
