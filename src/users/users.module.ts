import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { AdminSeeder } from './admin.seeder';
import { UsersController } from './users.controller';


@Module({
  // nconnectiw User entity m3a TypeORM
  imports: [TypeOrmModule.forFeature([User])],

  // services + seeder
  providers: [
    UsersService,
    AdminSeeder, // bash ncreate admin par defaut
  ],

  // controller mta3 users (profile)
  controllers: [UsersController],

  // nexportiw UsersService besh AuthModule ynajem yesta3mlou
  exports: [UsersService],
})
export class UsersModule {}


