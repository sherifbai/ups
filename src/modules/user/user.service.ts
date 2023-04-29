import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { createPagination } from '@app/common/helper/pagination';
import { UsersResponse } from '@app/modules/user/types/users.response';
import { IdDto } from '@app/common/dto/id.dto';
import { UserResponse } from '@app/modules/user/types/user.response';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async users(data: PaginationDto): Promise<UsersResponse> {
    const count = await this.prisma.user.count();
    const pagination = createPagination({
      count,
      page: data.page,
      perPage: data.perPage,
    });

    const users = await this.prisma.user.findMany({
      select: {
        email: true,
        mediumMark: true,
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

  async user(data: IdDto & PaginationDto): Promise<UserResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
      select: {
        email: true,
        mediumMark: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User does not found');
    }

    const count = await this.prisma.post.count({
      where: { userId: data.id },
    });
    const pagination = createPagination({
      count,
      page: data.page,
      perPage: data.perPage,
    });

    const posts = await this.prisma.post.findMany({
      where: { userId: data.id },
      select: { title: true, content: true, mediumMark: true },
      skip: pagination.skip,
      take: pagination.take,
    });

    return {
      user,
      posts,
      totalCount: count,
      totalPage: pagination.totalPage,
    };
  }
}
