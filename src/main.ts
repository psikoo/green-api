import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

export let app: any;
async function bootstrap() {
  app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("v1");
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  await app.listen(AppModule.port);
}
bootstrap();