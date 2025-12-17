import { Controller, Get, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserRole } from './entities/user-role.enum';

@Controller('users')
// controller mta3 users
export class UsersController {

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  // endpoint besh admin ychouf profile mta3ou
  getProfile(@Req() req: any) {
    // ken user mech admin → accès refusé
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Access denied');
    }

    return req.user;
  }
}

