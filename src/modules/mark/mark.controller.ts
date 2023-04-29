import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MarkService } from '@app/modules/mark/mark.service';
import { MarkPostDto } from '@app/modules/mark/dto/mark.post.dto';
import { User } from '@app/common/decorators/user.decorator';
import { JwtPayloadInterface } from '@app/common/interfaces/jwt.payload.interface';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@app/modules/auth/guard/auth.gurd';

@UseGuards(AuthGuard)
@ApiTags('Mark post')
@Controller({ path: 'marks', version: '1' })
export class MarkController {
  constructor(private readonly markService: MarkService) {}

  @Post()
  @HttpCode(HttpStatus.NO_CONTENT)
  async addMark(
    @Body() data: MarkPostDto,
    @User() user: JwtPayloadInterface,
  ): Promise<void> {
    return this.markService.addMark({ ...data, id: user.sub });
  }
}
