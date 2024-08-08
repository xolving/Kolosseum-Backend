import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('status')
  @UseGuards(AuthGuard)
  async getStatus(@Req() request: Request) {
    request.headers.forEach((element) => {
      console.log(element);
    });
    return;
  }
}
