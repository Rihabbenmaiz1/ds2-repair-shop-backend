import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRole } from './entities/user-role.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
// service besh ncreate admin par defaut ken mafammech hata admin fel base
export class AdminSeeder implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    // nlawjou ken famma admin deja
    const admin = await this.usersService.findByEmail('admin@admin.com');
    if (admin) return;

    // nhashiw password
    const password = await bcrypt.hash('admin123', 10);

    // ncreate admin par defaut
    await this.usersService.create({
      email: 'admin@admin.com',
      username: 'admin',
      password,
      role: UserRole.ADMIN,
    });

    console.log('✅ Admin par défaut créé');
  }
}
