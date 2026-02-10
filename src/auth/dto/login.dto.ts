import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(50)
  @ApiProperty({ example: 'admin1' })
  readonly username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @ApiProperty({ example: 'password' })
  readonly password: string;
}
