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
import { AuthGuard } from '@app/modules/auth/guard/auth.gurd';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserResponse } from '@app/modules/user/types/user.response';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: UserResponse })
  @Get()
  @HttpCode(HttpStatus.OK)
  async users(@Query() query: PaginationDto): Promise<UserResponse> {
    return this.userService.users(query);
  }
}
