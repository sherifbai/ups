import { PostService } from '@app/modules/post/post.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from '@app/modules/post/dto/create.post.dto';
import { User } from '@app/common/decorators/user.decorator';
import { AuthGuard } from '@app/modules/auth/guard/auth.gurd';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtPayloadInterface } from '@app/common/interfaces/jwt.payload.interface';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { PostResponse } from '@app/modules/post/types/post.response';

@UseGuards(AuthGuard)
@ApiTags('Posts')
@Controller({ path: 'posts', version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(
    @Body() data: CreatePostDto,
    @User() user: JwtPayloadInterface,
  ): Promise<void> {
    return this.postService.create({ ...data, id: user.sub });
  }

  @ApiResponse({ type: PostResponse })
  @Get()
  @HttpCode(HttpStatus.OK)
  async posts(@Query() query: PaginationDto): Promise<PostResponse> {
    return this.postService.posts(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async post(@Param('id', ParseIntPipe) id: number) {
    return this.postService.post({ id });
  }
}
