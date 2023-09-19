import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'myAccessKey',
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
