import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { CreatePostDto } from '@app/modules/post/dto/create.post.dto';
import { createPagination } from '@app/common/helper/pagination';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { PostResponse } from '@app/modules/post/types/post.response';
import { IdDto } from '@app/common/dto/id.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto & IdDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
      select: { id: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.post.create({
      data: {
        userId: user.id,
        title: data.title,
        content: data.content,
      },
    });
  }

  async posts(data: PaginationDto): Promise<PostResponse> {
    const count = await this.prisma.post.count();
    const pagination = createPagination({
      count,
      page: data.page,
      perPage: data.perPage,
    });

    const posts = await this.prisma.post.findMany({
      select: {
        title: true,
        mediumMark: true,
        content: true,
      },
      skip: pagination.skip,
      take: pagination.take,
    });

    return {
      data: posts,
      totalCount: count,
      totalPage: pagination.totalPage,
    };
  }

  async post(data: IdDto) {
    const post = await this.prisma.post.findUnique({
      where: { id: data.id },
      include: { user: { select: { email: true, mediumMark: true } } },
    });

    if (!post) {
      throw new NotFoundException('Post does not found');
    }

    return post;
  }
}
