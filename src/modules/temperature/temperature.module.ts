import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TemperatureService } from './temperature.service';
import { TemperatureController } from './temperature.controller';
import { Temperature } from './entities/temperature.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Temperature])],
  controllers: [TemperatureController],
  providers: [TemperatureService],
})
export class TemperatureModule {}
