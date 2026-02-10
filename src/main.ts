import * as fs from 'fs';

import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Must import NestFactory first or everything fucking breaks for some reason
// eslint-disable-next-line import/order
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

import { AppModule } from './app.module';

export const API_PREFIX = 'v1';
export let app: INestApplication;

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};

async function bootstrap() {
  app = await NestFactory.create(AppModule, { httpsOptions });
  app.setGlobalPrefix(API_PREFIX);
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
