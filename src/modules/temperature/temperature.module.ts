import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Temperature } from './entities/temperature.entity';
import { TemperatureController } from './temperature.controller';
import { TemperatureService } from './temperature.service';

@Module({
  imports: [TypeOrmModule.forFeature([Temperature])],
  controllers: [TemperatureController],
  providers: [TemperatureService],
})
export class TemperatureModule {}
