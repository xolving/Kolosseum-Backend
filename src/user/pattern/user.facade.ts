import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserFacade {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getUser(request: Request) {
    const token = request.headers.authorization.substring(7);
    const id = this.jwtService.decode(token).sub;
    const user = await this.userRepository.findOneBy({
      id: id,
    });

    return user;
  }
}
