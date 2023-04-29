import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ type: 'string' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
