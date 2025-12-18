import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UserRole } from '../users/entities/user-role.enum';

@Injectable()
// service responsable 3la gestion devices
export class DevicesService {
  constructor(
    @InjectRepository(Device)
    // repository mta3 Device entity
    private readonly devicesRepository: Repository<Device>,
  ) {}

  // ncreate device jdid (kol user connecté)
  create(dto: CreateDeviceDto): Promise<Device> {
    const device = this.devicesRepository.create(dto);
    return this.devicesRepository.save(device);
  }

  // tjib liste mta3 devices elkol (kol user connecté)
  findAll(): Promise<Device[]> {
    return this.devicesRepository.find();
  }

  // nfassa5 device (ADMIN bark)
  async remove(id: number, userRole: UserRole): Promise<void> {
    // ken mech ADMIN → accès refusé
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin only');
    }

    const result = await this.devicesRepository.delete(id);

    // ken device mech mawjoud
    if (result.affected === 0) {
      throw new NotFoundException('Device not found');
    }
  }
}
