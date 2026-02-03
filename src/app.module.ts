import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerMiddleware, TokenMiddleware } from './middleware';
import { DatabaseModule } from './database/database.module';
import { TemperatureModule } from './modules/temperature/temperature.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), DatabaseModule, // Config
    TemperatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get("PORT") ?? 3000;
  }
  // Middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, TokenMiddleware)
      .forRoutes({ path:"*path", method:RequestMethod.ALL});
  }
}