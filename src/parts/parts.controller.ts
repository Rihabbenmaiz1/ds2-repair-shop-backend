import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PartsService } from './parts.service';
import { UserRole } from '../users/entities/user-role.enum';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Controller('parts')
// controller mta3 gestion stock spare parts
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  // helper besh nverifiw ken user ADMIN
  private ensureAdmin(req: any) {
    if (req.user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin only');
    }
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  // kol user connecté ynajem ychouf stock
  getAll() {
    return this.partsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  // ADMIN bark ynajem ycreate piece jdida
  create(@Body() dto: CreatePartDto, @Req() req: any) {
    this.ensureAdmin(req);
    return this.partsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  // ADMIN bark ynajem ybaddel stock w2ella price
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePartDto,
    @Req() req: any,
  ) {
    this.ensureAdmin(req);
    return this.partsService.update(+id, dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  // ADMIN bark ynajem yfassa5 piece
  async remove(@Param('id') id: string, @Req() req: any) {
    this.ensureAdmin(req);
    await this.partsService.remove(+id);
    return { message: 'Spare part deleted' };
  }
}
