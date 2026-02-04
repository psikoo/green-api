import { IsDateString, IsNumber } from 'class-validator';

export class CreateTemperatureDto {
  @IsDateString()
  readonly time: Date;

  @IsNumber()
  readonly sensorid: number;

  @IsNumber()
  readonly temperature: number;
}
