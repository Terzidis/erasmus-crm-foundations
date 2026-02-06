import { IsEmail, IsUUID, MinLength } from 'class-validator';

export class RegisterDto {
  @IsUUID()
  tenantId: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
