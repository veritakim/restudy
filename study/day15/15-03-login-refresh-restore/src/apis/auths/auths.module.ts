import { Module } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthsResolver } from './auths.resolver';
import { AuthsService } from './auths.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtRefreshStrategy } from 'src/commons/auth/jwt-refresh.strategy';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
@Module({
  imports: [
    JwtModule.register({
      // global: true,
      // secret: 'access',
      // signOptions: { expiresIn: '5s' },
    }), //
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    JwtAccessStrategy,
    JwtRefreshStrategy,
    AuthsResolver, //
    AuthsService,
    UsersService,
  ],
})
export class AuthsModule {}
