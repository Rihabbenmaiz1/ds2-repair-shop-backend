import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
// strategy mta3 JWT (na9ra token w entala3 user)
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // nextractiw token mel header Authorization
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // nafess secret ely sta3melneh fy  AuthModule
      secretOrKey: 'SECRET_DS2',
    });
  }

  // payload jey mel token
  async validate(payload: any) {
    // nraj3ou user object bech yethat fi req.user
    return {
      userId: payload.sub,
      role: payload.role,
    };
  }
}

