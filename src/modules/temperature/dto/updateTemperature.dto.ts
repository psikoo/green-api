import { PartialType } from '@nestjs/mapped-types';
import { CreateTemperatureDto } from './createTemperature.dto';
import { IsDateString, IsNumber } from "class-validator";

export class UpdateTemperatureDto extends PartialType(CreateTemperatureDto) {
  @IsDateString()
  readonly time: Date;
  @IsNumber()
  readonly sensorid: number;
  @IsNumber()
  readonly temperature: number;
}
