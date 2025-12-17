import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  // UsersModule bach najmou nesta3mlou UsersService
  imports: [
    UsersModule,

    // configuration JWT (secret temporaire)
    JwtModule.register({
      secret: 'SECRET_DS2', // secret mta3 JWT (ba3ed nbadlou)
      signOptions: { expiresIn: '1h' },
    }),
  ],

  // AuthService m3a JwtStrategy
  providers: [AuthService, JwtStrategy],

  controllers: [AuthController],
})
export class AuthModule {}

