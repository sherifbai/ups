import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { createPagination } from '@app/common/helper/pagination';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async users(data: PaginationDto) {
    const count = await this.prisma.user.count();
    const pagination = createPagination({
      count,
      page: data.page,
      perPage: data.perPage,
    });

    const users = await this.prisma.user.findMany({
      select: {
        email: true,
      },
      skip: pagination.skip,
      take: pagination.take,
    });

    return {
      data: users,
      totalCount: count,
      totalPage: pagination.totalPage,
    };
  }

  async user(data: { userId: number } & PaginationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
      select: {
        email: true,
        mediumMark: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User does not found');
    }

    const count = await this.prisma.post.count({
      where: { userId: data.userId },
    });
    const pagination = createPagination({
      count,
      page: data.page,
      perPage: data.perPage,
    });

    const posts = await this.prisma.post.findMany({
      where: { userId: data.userId },
      select: { title: true, content: true, mediumMark: true },
      skip: pagination.skip,
      take: pagination.take,
    });

    return {
      user,
      posts,
      totalPage: pagination.totalPage,
    };
  }
}
