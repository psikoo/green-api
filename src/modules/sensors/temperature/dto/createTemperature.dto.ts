import { Transform } from 'class-transformer';
import { IsDateString, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class CreateTemperatureDto {
  @IsDateString()
  @IsOptional()
  readonly time: Date;

  @IsNumber()
  @IsPositive()
  readonly sensorid: number;

  // Parse values like 18,4 to be 18.4
  @Transform(({ value }) => { return typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value as number; })
  @IsNumber()
  readonly temperature: number;
}
