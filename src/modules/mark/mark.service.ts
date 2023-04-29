import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@app/prisma/prisma.service';
import { MarkPostDto } from '@app/modules/mark/dto/mark.post.dto';
import { IdDto } from '@app/common/dto/id.dto';

@Injectable()
export class MarkService {
  constructor(private readonly prisma: PrismaService) {}

  async addMark(data: MarkPostDto & IdDto): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: data.id },
      select: { id: true },
    });
    const post = await this.prisma.post.findUnique({
      where: { id: data.postId },
      select: { id: true, userId: true },
    });

    if (!user) {
      throw new NotFoundException('User does not found');
    }

    if (!post) {
      throw new NotFoundException('Post does not found');
    }

    const mark = await this.prisma.postsMark.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });

    if (mark) {
      await this.prisma.postsMark.update({
        where: {
          userId_postId: {
            userId: user.id,
            postId: post.id,
          },
        },
        data: { mark: data.mark },
      });
    } else {
      await this.prisma.postsMark.create({
        data: {
          userId: user.id,
          postId: post.id,
          mark: data.mark,
        },
      });
    }

    await this.calculateMediumMarkForPost(post.id);
    await this.calculateMediumMarkForUser(post.userId);
  }

  async calculateMediumMarkForUser(userId: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { posts: { select: { mediumMark: true } } },
    });

    if (!user) {
      throw new NotFoundException('User does not found');
    }

    if (user.posts.length === 0) {
      return;
    }

    const mediumMark =
      user.posts.reduce((acc, value) => acc + value.mediumMark, 0) /
      user.posts.length;

    await this.prisma.user.update({
      where: { id: userId },
      data: { mediumMark },
    });
  }

  async calculateMediumMarkForPost(postId: number): Promise<void> {
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
      select: { postMarks: { select: { mark: true } } },
    });

    if (!post) {
      throw new NotFoundException('Post does not found');
    }

    const mediumMark =
      post.postMarks.reduce((acc, value) => acc + value.mark, 0) /
      post.postMarks.length;

    await this.prisma.post.update({
      where: { id: postId },
      data: { mediumMark },
    });
  }
}
