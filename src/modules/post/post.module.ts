import { Module } from '@nestjs/common';
import { PostController } from '@app/modules/post/post.controller';
import { PostService } from '@app/modules/post/post.service';

@Module({
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
