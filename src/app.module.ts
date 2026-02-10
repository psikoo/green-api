import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, DiscoveryModule } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CombinedAuthGuard } from './auth/passport/guards/combined-auth.guard';
import { RolesGuard } from './auth/passport/guards/roles.guard';
import { LoggerMiddleware } from './middleware';
import { TemperatureModule } from './modules/sensors/temperature/temperature.module';
import { DatabaseProvider } from './providers/database.provider';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DiscoveryModule,
    DatabaseProvider,
    // Modules
    TemperatureModule,
  ],
  controllers: [AppController],
  providers: [
    { provide: APP_GUARD, useClass: CombinedAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    AppService,
  ],
})
export class AppModule implements NestModule {
  static port: number;
  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get<number>('PORT') ?? 3000;
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware)
      .forRoutes({ path: '*path', method: RequestMethod.ALL });
  }
}
