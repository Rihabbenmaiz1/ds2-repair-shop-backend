import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRole } from '../users/entities/user-role.enum';
import { OptionalJwtGuard } from './guards/optional-jwt.guard'; // guard optional: token ikoun mawjoud walla le
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
// controller mta3 el authentification (register / login / profile)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  // nesta3mlou guard optional: 
  // ken token mawjoud → nista5dmou (admin)
  // ken mafamech  token → normal (tech)
  @UseGuards(OptionalJwtGuard)
  async register(@Body() body: any, @Req() req: any) {
    const { email, password, username, role } = body;

    // req.user ya3ni admin connecté walla undefined
    return this.authService.register(
      email,
      password,
      username,
      role || UserRole.TECH, // par defaut user tech
      req.user,
    );
  }

  @Post('login')
  // login mta3 user b email w password
  async login(@Body() body: any) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  // endpoint hedha ADMIN bark ynajem yesta3mlou
  getProfile(@Req() req: any) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Accès réservé à l’administrateur');
    }
    // nraj3ou info mta3 admin connecté
    return req.user;
  }
}



