import { Injectable } from '@nestjs/common';
import { UserFacade } from './pattern/user.facade';

@Injectable()
export class UserService {
  constructor(private readonly userFacade: UserFacade) {}

  getStatus(request: any) {
    const authorization = request.headers.authorization.substring(7);
    return this.userFacade.getUser(authorization);
  }
}
