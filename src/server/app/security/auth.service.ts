import { Injectable } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {

  constructor(private readonly jwtStrategy: JwtStrategy) { }

  public async authenticate(req, next) {
    const jwt: any = this.jwtStrategy;
    jwt.success = (user) => {
      req.user = user;
      next();
    };
    jwt.fail = () => next();
    jwt.error = () => next();

    await jwt.authenticate(req, { session: false });
    return req.user;
  }
}
