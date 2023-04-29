import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MarkPostDto {
  @ApiProperty({ type: 'number' })
  @IsNotEmpty()
  @IsNumber()
  postId: number;

  @ApiProperty({ type: 'number', maximum: 10, minimum: 0 })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  mark: number;
}
