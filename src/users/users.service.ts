import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.enum';

@Injectable()
// service responsable 3la gestion users (DB access)
export class UsersService {
  constructor(
    @InjectRepository(User)
    // repository mta3 User entity
    private readonly userRepository: Repository<User>,
  ) {}

  // nlawjou 3la user b email (login / register check)
  findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // creation user jdid fel base
  create(user: Partial<User>): Promise<User> {
    return this.userRepository.save(user);
  }

  // tjib liste mta3 kol users (ADMIN only)
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // tbadel role mta3 user
  async updateRole(id: number, role: UserRole): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role;
    return this.userRepository.save(user);
  }

  // tfasa5 user mel base
  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}


