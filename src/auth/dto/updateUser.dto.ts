import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsString } from 'class-validator';

import { RegisterDto } from './register.dto';

export class UpdateUserDto extends PartialType(RegisterDto) {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsNumber()
  readonly role: number;
}
