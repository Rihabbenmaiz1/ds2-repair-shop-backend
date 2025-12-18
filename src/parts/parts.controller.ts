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
import { UpdateStockDto } from './dto/update-stock.dto';

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

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  // tjib spare part wahda b id (BONUS)
  getOne(@Param('id') id: string) {
    return this.partsService.findOne(+id);
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
  // ADMIN bark ynajem ybaddel stock wa2ella price
  update(
    @Param('id') id: string,
    @Body() dto: UpdatePartDto,
    @Req() req: any,
  ) {
    this.ensureAdmin(req);
    return this.partsService.update(+id, dto);
  }

  @Patch(':id/add-stock')
  @UseGuards(AuthGuard('jwt'))
  // ADMIN bark ynajem yzid stock (BONUS)
  addStock(
    @Param('id') id: string,
    @Body() dto: UpdateStockDto,
    @Req() req: any,
  ) {
    this.ensureAdmin(req);
    return this.partsService.addStock(+id, dto.quantity);
  }

  @Patch(':id/remove-stock')
  @UseGuards(AuthGuard('jwt'))
  // ADMIN bark ynajem yna9es stock (BONUS)
  removeStock(
    @Param('id') id: string,
    @Body() dto: UpdateStockDto,
    @Req() req: any,
  ) {
    this.ensureAdmin(req);
    return this.partsService.removeStock(+id, dto.quantity);
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

