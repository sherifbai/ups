import { PostService } from '@app/modules/post/post.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto } from '@app/modules/post/dto/create.post.dto';
import { User } from '@app/common/decorators/user.decorator';
import { AuthGuard } from '@app/modules/auth/guard/auth.gurd';
import { ApiTags } from '@nestjs/swagger';
import { JtwPayloadInterface } from '@app/common/interfaces/jtw.payload.interface';
import { PaginationDto } from '@app/common/dto/pagination.dto';

@UseGuards(AuthGuard)
@ApiTags('Posts')
@Controller({ path: 'posts', version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async create(@Body() data: CreatePostDto, @User() user: JtwPayloadInterface) {
    return this.postService.create({ ...data, userId: user.sub });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async posts(@Query() query: PaginationDto) {
    return this.postService.posts(query);
  }
}