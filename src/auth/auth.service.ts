import {
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../users/entities/user-role.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
// service mta3 auth (register / login)
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // register user jdid
  async register(
    email: string,
    password: string,
    username: string,
    role: UserRole = UserRole.TECH,
    currentUser?: User,
  ): Promise<User> {
    // ken nheb ncreate ADMIN, lazem currentUser ykoun ADMIN
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
      throw new ForbiddenException('Email deja utilisé');
    }

    // nhashiw password b bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // ncreate user fel base
    return this.usersService.create({
      email,
      username,
      password: hashedPassword,
      role,
    });
  }

  // login user
  async login(email: string, password: string) {
    // nlawjou 3la user b email
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // ncompareiw password m3a hash
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    // payload mta3 JWT (id + role)
    const payload = {
      sub: user.id,
      role: user.role,
    };

    // nraja3 JWT token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}


