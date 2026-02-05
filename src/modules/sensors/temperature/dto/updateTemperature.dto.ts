import { PartialType } from '@nestjs/mapped-types';
import { IsDateString, IsNumber, IsOptional } from 'class-validator';

import { CreateTemperatureDto } from './createTemperature.dto';

export class UpdateTemperatureDto extends PartialType(CreateTemperatureDto) {
  @IsDateString()
  @IsOptional()
  readonly time: Date;

  @IsNumber()
  readonly sensorid: number;

  @IsNumber()
  readonly temperature: number;
}
