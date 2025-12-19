import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  // tjib liste mta3 spare parts el kol
  findAll(): Promise<SparePart[]> {
    return this.partsRepository.find();
  }

  // tjib spare part wahda b id
  async findOne(id: number): Promise<SparePart> {
    const part = await this.partsRepository.findOne({ where: { id } });

    // ken part mech mawjoud
    if (!part) {
      throw new NotFoundException('Spare part not found');
    }

    return part;
  }

  // ncreate spare part jdida (ADMIN)
  create(dto: CreatePartDto): Promise<SparePart> {
    const part = this.partsRepository.create(dto);
    return this.partsRepository.save(part);
  }

  // nupdate stock wala price mta3 spare part (ADMIN)
  async update(id: number, dto: UpdatePartDto): Promise<SparePart> {
    // ⚠️ lazem fama champs bech nupdate
    if (!dto || Object.keys(dto).length === 0) {
      throw new BadRequestException('No update values provided');
    }

    const part = await this.findOne(id);

    Object.assign(part, dto);
    return this.partsRepository.save(part);
  }

  // tzid stock mta3 spare part (BONUS)
  async addStock(id: number, quantity: number): Promise<SparePart> {
    // nverifiw quantity
    if (!quantity || quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    const part = await this.findOne(id);
    part.stock += quantity;

    return this.partsRepository.save(part);
  }

  // tna9es stock mta3 spare part (BONUS)
  async removeStock(id: number, quantity: number): Promise<SparePart> {
    // nverifiw quantity
    if (!quantity || quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    const part = await this.findOne(id);

    // ken stock ma yekfich
    if (part.stock < quantity) {
      throw new BadRequestException('Not enough stock');
    }

    part.stock -= quantity;
    return this.partsRepository.save(part);
  }

  // nfassa5 spare part mel base (ADMIN)
  async remove(id: number): Promise<void> {
    const result = await this.partsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Spare part not found');
    }
  }
}


