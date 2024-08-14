import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserFacade } from './pattern/user.facade';

@Injectable()
export class UserService {
  constructor(private readonly userFacade: UserFacade) {}

  getStatus(request: Request) {
    return this.userFacade.getUser(request);
  }
}
