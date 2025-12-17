import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SparePart } from './entities/spare-part.entity';
import { CreatePartDto } from './dto/create-part.dto';
import { UpdatePartDto } from './dto/update-part.dto';

@Injectable()
// service responsable 3la gestion stock mta3 spare parts
export class PartsService {
  constructor(
    @InjectRepository(SparePart)
    // repository mta3 SparePart entity
    private readonly partsRepository: Repository<SparePart>,
  ) {}

  // tjib liste mta3 kol spare parts
  findAll(): Promise<SparePart[]> {
    return this.partsRepository.find();
  }

  // ncreate spare part jdida
  create(dto: CreatePartDto): Promise<SparePart> {
    const part = this.partsRepository.create(dto);
    return this.partsRepository.save(part);
  }

  // nupdate stock wala price mta3 spare part
  async update(id: number, dto: UpdatePartDto): Promise<SparePart> {
    const part = await this.partsRepository.findOne({ where: { id } });

    // ken part mech mawjoud
    if (!part) {
      throw new NotFoundException('Spare part not found');
    }

    Object.assign(part, dto);
    return this.partsRepository.save(part);
  }

  // nfasa5 spare part mel base
  async remove(id: number): Promise<void> {
    const result = await this.partsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Spare part not found');
    }
  }
}
