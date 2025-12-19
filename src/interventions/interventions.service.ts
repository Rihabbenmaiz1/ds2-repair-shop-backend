import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Intervention } from './entities/intervention.entity';
import { CreateInterventionDto } from './dto/create-intervention.dto';
import { UserRole } from '../users/entities/user-role.enum';

@Injectable()
// service mta3 logique el atelier (interventions)
export class InterventionsService {
  constructor(
    @InjectRepository(Intervention)
    private readonly interventionRepository: Repository<Intervention>,
    private readonly dataSource: DataSource,
  ) {}

  // NCREATE INTERVENTION
  async create(dto: CreateInterventionDto, technician: any): Promise<any> {
    return this.dataSource.transaction(async (manager) => {

      // 1️ nverifiw device
      const device = await manager.query(
        'SELECT * FROM device WHERE id = ?',
        [dto.deviceId],
      );

      if (device.length === 0) {
        throw new NotFoundException('Device not found');
      }

      // 2️ nverifiw spare parts w stock
      for (const partId of dto.sparePartIds) {
        const part = await manager.query(
          'SELECT * FROM spare_part WHERE id = ?',
          [partId],
        );

        if (part.length === 0) {
          throw new NotFoundException(`Spare part ${partId} not found`);
        }

        if (part[0].stock < 1) {
          throw new BadRequestException(
            `Not enough stock for ${part[0].name}`,
          );
        }

        // nna9sou stock
        await manager.query(
          'UPDATE spare_part SET stock = stock - 1 WHERE id = ?',
          [partId],
        );
      }

      // 3️ nbadlou status device → REPAIRING
      await manager.query(
        'UPDATE device SET status = "REPAIRING" WHERE id = ?',
        [dto.deviceId],
      );

      // 4️ n7otouou el technicien connecté
      const technicianId = technician.userId || technician.id;
      if (!technicianId) {
        throw new BadRequestException('Technician id missing');
      }

      // 5️ ncreate intervention
      const result = await manager.query(
        'INSERT INTO intervention (description, date, technicianId, deviceId) VALUES (?, NOW(), ?, ?)',
        [dto.description, technicianId, dto.deviceId],
      );

      const interventionId = result.insertId;

      // 6️ norebtou spare parts m3a intervention
      for (const partId of dto.sparePartIds) {
        await manager.query(
          'INSERT INTO intervention_spare_parts_spare_part (interventionId, sparePartId) VALUES (?, ?)',
          [interventionId, partId],
        );
      }

      return {
        message: 'Intervention created successfully',
        interventionId,
      };
    });
  }

  // BONUS – LIST MTA3 INTERVENTIONS (Version simple sans détails)
  async findAll(user: any): Promise<Intervention[]> {
    const options: any = {
      loadRelationIds: true, // bch nraja3 ken el IDs (mch el détails el kol)
    };

    if (user.role !== UserRole.ADMIN) {
      // tech ychouf kan mte3ou
      options.where = { technician: { id: user.userId } };
    }

    return this.interventionRepository.find(options);
  }

  // BONUS – NCHOUF INTERVENTION WAHDA (Version simple sans détails)
  async findOne(id: number, user: any): Promise<Intervention> {
    const intervention = await this.interventionRepository.findOne({
      where: { id },
      loadRelationIds: true, // bch nraja3 ken el IDs
    });

    if (!intervention) {
      throw new NotFoundException('Intervention not found');
    }

    // Vérification sécurité : mo9arnet el tech id
    const techIdInIntervention = Number(intervention.technician);
    if (user.role === UserRole.TECH && techIdInIntervention !== user.userId) {
      throw new ForbiddenException('Access denied');
    }

    return intervention;
  }
}




