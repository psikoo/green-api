import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';

import { CreateTemperatureDto } from './createTemperature.dto';

export class UpdateTemperatureDto extends PartialType(CreateTemperatureDto) {
  @IsDateString()
  @IsOptional()
  readonly time?: Date;

  @IsNumber()
  @IsPositive()
  @ApiProperty({ example: 10 })
  readonly sensorid: number;

  // Parse values like 18,4 to be 18.4
  @Transform(({ value }) => { return typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value as number; })
  @IsNumber()
  @ApiProperty({ example: 19.2 })
  readonly temperature: number;
}
