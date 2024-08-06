import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserRequest } from './dto/request/create-user.request';
import { LoginUserRequest } from './dto/request/login-user.request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('join')
  @HttpCode(200)
  joinUser(@Body() createUserRequest: CreateUserRequest) {
    return this.authService.joinUser(createUserRequest);
  }

  @Post('login')
  @HttpCode(200)
  loginUser(@Body() loginUserRequest: LoginUserRequest) {
    return this.authService.loginUser(loginUserRequest);
  }
}
