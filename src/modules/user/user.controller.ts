import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '@app/modules/user/user.service';
import { PaginationDto } from '@app/common/dto/pagination.dto';
import { AuthGuard } from '@app/modules/auth/guard/auth.gurd';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UsersResponse } from '@app/modules/user/types/users.response';

@ApiTags('Users')
@UseGuards(AuthGuard)
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBody({ type: UsersResponse })
  @Get()
  @HttpCode(HttpStatus.OK)
  async users(@Query() query: PaginationDto): Promise<UsersResponse> {
    return this.userService.users(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async user(
    @Query() query: PaginationDto,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this.userService.user({ ...query, id: userId });
  }
}
