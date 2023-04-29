import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { PrismaService } from '@app/prisma/prisma.service';
import { SignInUserDto } from '@app/modules/auth/dto/signin.user.dto';
import { SignupUserDto } from '@app/modules/auth/dto/signup.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInUserDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const comparePassword = await compare(data.password, user.password);

    if (!comparePassword) {
      throw new UnauthorizedException('Passwords does not match');
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signup(data: SignupUserDto): Promise<void> {
    const existUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existUser) {
      throw new BadRequestException('User with that email already exist');
    }

    await this.prisma.user.create({
      data: {
        email: data.email,
        password: await hash(data.password, 10),
      },
    });
  }
}
