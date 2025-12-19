import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user-role.enum';

@Injectable()
// service mta3 logique el auth (register / login)
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    email: string,
    password: string,
    username: string,
    role: UserRole,
    currentUser?: any,
  ) {
    // règle mohema:
    // ken nheb ncreate admin → lazem user connecté ikoun admin
    if (role === UserRole.ADMIN) {
      if (!currentUser || currentUser.role !== UserRole.ADMIN) {
        throw new ForbiddenException(
          'Seul un admin peut créer un autre admin',
        );
      }
    }

    // ncheckiw ken email deja mawjoud
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ForbiddenException('Email déjà utilisé');
    }

    // nhachiw el password b bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // ncreate user fel base
    return this.usersService.create({
      email,
      username,
      password: hashedPassword,
      role,
    });
  }

  async login(email: string, password: string) {
    // nlawjou 3la user b email
    const user = await this.usersService.findByEmail(email);

    // nverifiw el password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(
        'Email ou mot de passe incorrect',
      );
    }

    // payload mta3 JWT: id (sub) + role
    const payload = {
      sub: user.id,
      role: user.role,
    };

    // nraj3ou access token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}



