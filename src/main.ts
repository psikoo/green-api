import * as fs from 'fs';

import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// Must import NestFactory first or everything fucking breaks for some reason
// eslint-disable-next-line import/order
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

export const API_DEFAULT_VERSION = '1';
export let app: INestApplication;

const httpsOptions = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem'),
};
const documentOptions = new DocumentBuilder()
  .setTitle('Green API')
  .setDescription('Nebrija Green API documentation')
  .setVersion('v' + API_DEFAULT_VERSION)
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', in: 'header' }, 'jwt')
  .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token', in: 'header' }, 'token')
  .build();
const swaggerOptions = {
  customSiteTitle: 'Green API',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    // Order request in order GET, POST, PATCH, DELETE
    operationsSorter: function (a: { get(key: 'method'): string }, b: { get(key: 'method'): string }) {
      const order: Record<string, string> = { get: '0', post: '1', patch: '2', delete: '3' };
      return order[a.get('method')].localeCompare(order[b.get('method')]);
    },
  },
};

async function bootstrap() {
  app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: API_DEFAULT_VERSION,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const swaggerDocument = SwaggerModule.createDocument(app, documentOptions);
  SwaggerModule.setup(
    'api',
    app,
    swaggerDocument,
    swaggerOptions,
  );

  await app.listen(AppModule.port);
}
void bootstrap();
