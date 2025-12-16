import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
})
export class AppModule {}

