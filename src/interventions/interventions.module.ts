import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './entities/intervention.entity';
import { InterventionsService } from './interventions.service';
import { InterventionsController } from './interventions.controller';
import { Device } from '../devices/entities/device.entity';
import { SparePart } from '../parts/entities/spare-part.entity';

@Module({
  // nconnectiw les entities mta3 intervention + device + spare part
  imports: [
    TypeOrmModule.forFeature([Intervention, Device, SparePart]),
  ],

  // controller mta3 interventions
  controllers: [InterventionsController],

  // service mta3 interventions
  providers: [InterventionsService],
})
export class InterventionsModule {}



