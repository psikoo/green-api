import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

import { RegisterDto } from './register.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsString()
  @MaxLength(50)
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  readonly password: string;

  @IsNumber()
  @Min(0)
  @Max(3)
  readonly role: number;
}
