import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DevicesModule } from './devices/devices.module';
import { PartsModule } from './parts/parts.module';
import { InterventionsModule } from './interventions/interventions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mysql1234',
      database: 'repair_shop',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    DevicesModule,
    PartsModule,
    InterventionsModule,
    AuthModule,
  ],
})
export class AppModule {}

