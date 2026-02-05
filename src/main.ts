import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Must import NestFactory first or everything fucking breaks for some reason
// eslint-disable-next-line import/order
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { AppModule } from './app.module';

export let app: INestApplication;
async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(AppModule.port);
}
void bootstrap();
