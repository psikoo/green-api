import { DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectOptions } from 'typeorm';

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  useFactory(configService: ConfigService) {
    const dbConfig = {
      type: configService.get<string>('DB_TYPE'),
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DBNAME'),
      logging: configService.get<boolean>('DB_LOGGING'),
      autoLoadEntities: true,
      synchronize: true,
    } as ConnectOptions;
    return dbConfig;
  },
});
