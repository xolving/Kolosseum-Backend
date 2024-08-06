import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  constructor(id: string, email: string, password: string, isVerify: boolean) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.isVerify = isVerify;
  }

  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerify: boolean;
}
