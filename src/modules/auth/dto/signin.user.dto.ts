import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInUserDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
