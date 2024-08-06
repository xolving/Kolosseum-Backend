import { User } from '../entity/user.entity';

export class UserBuilder {
  id: string;
  email: string;
  password: string;
  isVerify: boolean;
  
  setEmail(email: string) {
    this.email = email;
    return this;
  }
  setPassword(password: string) {
    this.password = password;
    return this;
  }
  setId(id: string) {
    this.id = id;
    return this;
  }
  setVerify(isVerify: boolean) {
    this.isVerify = isVerify;
    return this;
  }
  build() {
    return new User(this.id, this.email, this.password, this.isVerify);
  }
}
