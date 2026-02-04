import { IsDateString, IsNumber, IsOptional } from 'class-validator';

export class CreateTemperatureDto {
  @IsDateString()
  @IsOptional()
  readonly time: Date;

  @IsNumber()
  readonly sensorid: number;

  @IsNumber()
  readonly temperature: number;
}
