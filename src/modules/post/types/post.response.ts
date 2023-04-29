import { ApiCreatedResponse, ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class Post {
  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'number' })
  mediumMark: number;

  @ApiProperty({ type: 'string' })
  content: string;
}

@ApiCreatedResponse()
export class PostResponse {
  @ApiModelProperty({ type: Post, isArray: true })
  data: Post[];

  @ApiProperty({ type: 'number' })
  totalCount: number;

  @ApiProperty({ type: 'number' })
  totalPage: number;
}
