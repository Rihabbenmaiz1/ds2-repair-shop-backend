import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './entities/device.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UserRole } from '../users/entities/user-role.enum';
import { DeviceStatus } from './entities/device-status.enum';
import { DeviceGrade } from './entities/device-grade.enum';

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

  // tjib device wahda b id
  async findOne(id: number): Promise<Device> {
    const device = await this.devicesRepository.findOne({
      where: { id },
    });

    if (!device) {
      throw new NotFoundException('Device not found');
    }

    return device;
  }

  // nfassa5 device (ADMIN bark)
  async remove(id: number, userRole: UserRole): Promise<void> {
    if (userRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Admin only');
    }

    const result = await this.devicesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Device not found');
    }
  }

  // nbadlou status mta3 device (BONUS)
  async updateStatus(
    id: number,
    status: DeviceStatus,
  ): Promise<Device> {
    // validation obligatoire
    if (!status) {
      throw new BadRequestException('Status is required');
    }

    const device = await this.findOne(id);
    device.status = status;

    return this.devicesRepository.save(device);
  }

  // nbadlou grade mta3 device ba3d repair (BONUS)
  async updateGrade(
    id: number,
    grade: DeviceGrade,
  ): Promise<Device> {
    //  validation obligatoire
    if (!grade) {
      throw new BadRequestException('Grade is required');
    }

    const device = await this.findOne(id);
    device.grade = grade;

    return this.devicesRepository.save(device);
  }
}


