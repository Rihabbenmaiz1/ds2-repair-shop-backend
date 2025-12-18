import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';

@Module({
  // nconnectiw Device entity m3a TypeORM
  imports: [TypeOrmModule.forFeature([Device])],

  // controller mta3 devices
  controllers: [DevicesController],

  // service mta3 devices
  providers: [DevicesService],
})
export class DevicesModule {}

