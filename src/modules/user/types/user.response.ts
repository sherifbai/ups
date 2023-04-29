import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class User {
  @ApiProperty({ type: 'string' })
  email: string;

  @ApiProperty({ type: 'number' })
  mediumMark: number;
}

export class UserResponse {
  @ApiModelProperty({ type: User, isArray: true })
  data: User[];

  @ApiProperty({ type: 'number' })
  totalCount: number;

  @ApiProperty({ type: 'number' })
  totalPage: number;
}
