import {
  Controller,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserRole } from './entities/user-role.enum';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller('users')
// controller mta3 users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // helper bash nverifiw ken ADMIN
  private ensureAdmin(req: any) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin only');
    }
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  // endpoint besh admin ychouf profile mta3ou
  getProfile(@Req() req: any) {
    this.ensureAdmin(req);
    return req.user;
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  // liste  users el kol (ADMIN)
  getAll(@Req() req: any) {
    this.ensureAdmin(req);
    return this.usersService.findAll();
  }

  @Patch(':id/role')
  @UseGuards(AuthGuard('jwt'))
  // changer role mta3 user (ADMIN)
  updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleDto,
    @Req() req: any,
  ) {
    this.ensureAdmin(req);
    return this.usersService.updateRole(+id, dto.role);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  // supprimer user (ADMIN)
  async remove(@Param('id') id: string, @Req() req: any) {
    this.ensureAdmin(req);
    await this.usersService.remove(+id);
    return { message: 'User deleted' };
  }
}


