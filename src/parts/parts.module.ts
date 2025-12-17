import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './entities/spare-part.entity';
import { PartsService } from './parts.service';
import { PartsController } from './parts.controller';

@Module({
  // nconnectiw SparePart entity m3a TypeORM
  imports: [TypeOrmModule.forFeature([SparePart])],

  // service mta3 gestion stock
  providers: [PartsService],

  // controller mta3 routes /parts
  controllers: [PartsController],
})
export class PartsModule {}
