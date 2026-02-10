import { IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class RegisterDto {
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
