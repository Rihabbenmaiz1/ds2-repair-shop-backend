import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Param,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UserRole } from '../users/entities/user-role.enum';

@Controller('interventions')
// controller mta3 el atelier (interventions)
export class InterventionsController {
  constructor(
    private readonly interventionsService: InterventionsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  // TECH bark ynajem ycreate intervention
  create(@Body() dto: CreateInterventionDto, @Req() req: any) {
    if (req.user.role !== UserRole.TECH) {
      throw new ForbiddenException('Only technician can create intervention');
    }
    return this.interventionsService.create(dto, req.user);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  // ADMIN ychouf kol / TECH ychouf mta3ou bark
  findAll(@Req() req: any) {
    return this.interventionsService.findAll(req.user);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  // tjib intervention wahda b id
  findOne(@Param('id') id: string, @Req() req: any) {
    return this.interventionsService.findOne(+id, req.user);
  }
}
