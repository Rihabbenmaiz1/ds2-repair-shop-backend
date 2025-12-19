import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtGuard extends AuthGuard('jwt') {
  // Cette fonction permet de ne pas bloquer la requête (401) si le token est absent
  handleRequest(err, user) {
    if (err || !user) {
      return null;
    }
    return user;
  }
}