import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InterventionsService } from './interventions.service';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UserRole } from '../users/entities/user-role.enum';

@Controller('interventions')
// controller mta3 interventions (fiche tasli7)
export class InterventionsController {
  constructor(
    private readonly interventionsService: InterventionsService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  // TECH bark ynajem ycreate intervention
  create(@Body() dto: CreateInterventionDto, @Req() req: any) {
    // ken user mech TECH → accès refusé
    if (req.user.role !== UserRole.TECH) {
      throw new ForbiddenException('Only technician can create intervention');
    }

    // n3aytou service w n3addiw user connecté (technicien)
    return this.interventionsService.create(dto, req.user);
  }
}
