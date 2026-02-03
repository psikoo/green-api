import { IsNumber, IsString } from "class-validator";

export class RegisterDto {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsNumber()
  readonly role: number;
}
