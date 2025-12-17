import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/entities/user-role.enum';

@Controller('auth')
// controller responsable 3la auth endpoints
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // endpoint bach ncreate user jdid
  async register(
    @Body() body: any,
    @Req() req: any,
  ) {
    const { email, password, username, role } = body;

    // currentUser bech nesta3mlou ba3d (ken admin connecté)
    const currentUser = req.user;

    // n3ayet le register mta3 AuthService
    return this.authService.register(
      email,
      password,
      username,
      role || UserRole.TECH, // TECH par defaut
      currentUser,
    );
  }

  @Post('login')
  // endpoint mta3 login
  async login(@Body() body: any) {
    const { email, password } = body;

    return this.authService.login(email, password);
  }
}

