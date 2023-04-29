import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { AuthGuard } from '@app/modules/guard/auth.gurd';

@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async users(@Query() query: PaginationDto) {
    return this.userService.users(query);
  }
}
