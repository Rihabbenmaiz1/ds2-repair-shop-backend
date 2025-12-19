import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validation globale (lezemmm)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ykhaly ken les champs mta3 DTO
      forbidNonWhitelisted: true, // error ken fama champ zeyed
      transform: true, // yhawel les types (string -> number)
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

