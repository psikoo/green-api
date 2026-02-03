import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectOptions } from "typeorm";

export const DatabaseProvider: DynamicModule = TypeOrmModule.forRootAsync({
  inject: [ConfigService],
  async useFactory(config: ConfigService) {
    const dbConfig = { 
      type: "postgres",
      host: config.get("DB_HOST"),
      port: config.get("DB_PORT"),
      username: config.get("DB_USER"),
      password: config.get("DB_PASSWORD"),
      database: config.get("DB_DBNAME"),
      logging: config.get("DB_LOGGING"),
      autoLoadEntities: true,
      synchronize: true
    } as ConnectOptions
    return dbConfig;
  }
})