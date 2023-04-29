import { ApiProperty } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { User } from '@app/modules/user/types/users.response';
import { Post } from '@app/modules/post/types/post.response';

export class UserResponse {
  @ApiModelProperty({ type: User })
  user: User;

  @ApiModelProperty({ type: Post, isArray: true })
  posts: Post[];

  @ApiProperty({ type: 'number' })
  totalCount: number;

  @ApiProperty({ type: 'number' })
  totalPage: number;
}
