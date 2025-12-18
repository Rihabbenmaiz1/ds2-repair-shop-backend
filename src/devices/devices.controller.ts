import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UserRole } from '../users/entities/user-role.enum';

@Controller('devices')
// controller mta3 gestion devices
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  // helper besh nverifiw ken user ADMIN
  private ensureAdmin(req: any) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin only');
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  // kol user connecté ynajem ysajel device jdid
  create(@Body() dto: CreateDeviceDto) {
    return this.devicesService.create(dto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  // kol user connecté ynajem ychouf liste mta3 devices
  findAll() {
    return this.devicesService.findAll();
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  // ADMIN bark ynajem yfassa5 fiche device
  async remove(@Param('id') id: string, @Req() req: any) {
    this.ensureAdmin(req);
    await this.devicesService.remove(+id, req.user.role);
    return { message: 'Device deleted' };
  }
}
