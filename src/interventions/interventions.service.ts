import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Intervention } from './entities/intervention.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';

@Injectable()
// service mta3 el interventions (logique el atelier)
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository: Repository<Intervention>,

    // DataSource bech na3mlou transaction
    private readonly dataSource: DataSource,
  ) {}

  // creation intervention (TECH bark) + transaction kemlaa
  async create(dto: CreateInterventionDto, technician: any): Promise<any> {
    return this.dataSource.transaction(async (manager) => {

      // 1️ nverifiw ken device mawjoud
      const deviceResults = await manager.query(
        'SELECT * FROM device WHERE id = ?',
        [dto.deviceId],
      );

      if (deviceResults.length === 0) {
        throw new NotFoundException(
          `Device b ID ${dto.deviceId} mech mawjoud`,
        );
      }

      // 2️ nverifiw spare parts w stock mta3hom
      for (const partId of dto.sparePartIds) {
        const partResults = await manager.query(
          'SELECT * FROM spare_part WHERE id = ?',
          [partId],
        );

        if (partResults.length === 0) {
          throw new NotFoundException(
            `Spare part b ID ${partId} mech mawjoud`,
          );
        }

        const part = partResults[0];

        // ken stock ma yekfich
        if (part.stock < 1) {
          throw new BadRequestException(
            `Stock ma yekfich lel piece: ${part.name}`,
          );
        }

        // ndecrementiw stock automatiquement
        await manager.query(
          'UPDATE spare_part SET stock = stock - 1 WHERE id = ?',
          [partId],
        );
      }

      // 3️ nbadlou status mta3 device lel REPAIRING
      await manager.query(
        'UPDATE device SET status = "REPAIRING" WHERE id = ?',
        [dto.deviceId],
      );

      // 4️ nverifiw ID mta3 technicien mel token
      const finalTechId = technician.userId || technician.id;

      if (!finalTechId) {
        throw new BadRequestException(
          'ID technicien mawjoudch fel token',
        );
      }

      // 5️ ncreate intervention fel base
      const insertResult = await manager.query(
        'INSERT INTO intervention (description, date, technicianId, deviceId) VALUES (?, NOW(), ?, ?)',
        [dto.description, finalTechId, dto.deviceId],
      );

      const newInterventionId = insertResult.insertId;

      // 6️⃣ nربطو spare parts m3a intervention (Many-to-Many)
      for (const partId of dto.sparePartIds) {
        await manager.query(
          'INSERT INTO intervention_spare_parts_spare_part (interventionId, sparePartId) VALUES (?, ?)',
          [newInterventionId, partId],
        );
      }

      // response wathha fel Postman
      return {
        status: 'success',
        message: `Intervention n°${newInterventionId} tsajlet b succes`,
        data: {
          interventionId: newInterventionId,
          description: dto.description,
          technicianId: finalTechId,
          deviceId: dto.deviceId,
          sparePartsCount: dto.sparePartIds.length,
          timestamp: new Date().toISOString(),
        },
      };
    });
  }
}




