import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

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
}


