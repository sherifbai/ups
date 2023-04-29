import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '@app/modules/auth/auth.service';
import { SignInUserDto } from '@app/modules/auth/dto/signin.user.dto';
import { SignupUserDto } from '@app/modules/auth/dto/signup.user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth controller')
@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @HttpCode(HttpStatus.NO_CONTENT)
  async signup(@Body() data: SignupUserDto): Promise<void> {
    return this.authService.signup(data);
  }

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: SignInUserDto): Promise<{ access_token: string }> {
    return this.authService.signIn(data);
  }
}
