import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Role } from 'src/user/entity/role.enum';
import { User } from 'src/user/entity/user.entity';
import { UserBuilder } from 'src/user/pattern/user.builder';
import { Repository } from 'typeorm';
import { CreateUserRequest } from './dto/request/create-user.request';
import { LoginUserRequest } from './dto/request/login-user.request';
import { LoginUserResponse } from './dto/response/login-user.response';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async joinUser(createUserRequest: CreateUserRequest) {
    if (
      await this.userRepository.existsBy({ email: createUserRequest.email })
    ) {
      throw new BadRequestException(
        '해당 이메일을 사용하는 유저가 이미 존재합니다.',
      );
    }

    const encryptPassword = await bcrypt.hash(createUserRequest.password, 10);
    const user = new UserBuilder()
      .setId(randomUUID())
      .setRole(Role.ROLE_USER)
      .setVerify(false)
      .setEmail(createUserRequest.email)
      .setPassword(encryptPassword)
      .build();

    this.userRepository.save(user);
  }

  async loginUser(
    LoginUserRequest: LoginUserRequest,
  ): Promise<LoginUserResponse> {
    const user = await this.userRepository.findOneBy({
      email: LoginUserRequest.email,
    });

    if (!user) {
      throw new NotFoundException(
        '해당 이메일을 사용하는 유저를 찾을 수 없습니다.',
      );
    }

    if (!(await bcrypt.compare(LoginUserRequest.password, user.password))) {
      throw new BadRequestException('비밀번호가 일치하지 않습니다.');
    }

    const payload = {
      sub: user.id,
    };

    const secret = this.jwtService.sign(payload);
    const expired = this.jwtService.decode(secret).exp;

    return {
      access_token: secret,
      expired: expired,
    };
  }
}
