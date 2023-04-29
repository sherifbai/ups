import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupUserDto {
  @ApiProperty({ type: 'string' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  password;
}
