import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      /** 
       * 
       jwtFromRequest: (req) => {
         const accessToken = req.heaers.Authorization; // "Bearer ~~~ "
         const result = accessToken.replace('Bearer ', '');
         return result;
        },
        */
      jwtFromRequest: (req) => {
        console.log(`cookie!!!! ${req}`);
        const cookie = req.headers.cookie; // refreshToken=alsjdklnbcoizhwss
        const refreshToken = cookie.replace('refreshToken=', '');

        return refreshToken;
      },
      secretOrKey: 'myRefreshKey',
    });
  }

  validate(payload) {
    console.log(payload);
    return {
      email: payload.email,
      id: payload.sub,
    };
    // req.user에 데이터 담김
  }
}
