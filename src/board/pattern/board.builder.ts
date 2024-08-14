import { User } from 'src/user/entity/user.entity';
import { Board } from '../entity/board.entity';

export class BoardBuilder {
  id: number;
  title: string;
  content: string;
  user: User;
  published: Date;

  setId(id: number) {
    this.id = id;
    return this;
  }
  setTitle(title: string) {
    this.title = title;
    return this;
  }
  setContent(content: string) {
    this.content = content;
    return this;
  }
  setUser(user: User) {
    this.user = user;
    return this;
  }
  setPublished(published: Date) {
    this.published = published;
    return this;
  }
  build() {
    const board = new Board();
    board.id = this.id;
    board.title = this.title;
    board.content = this.content;
    board.user = this.user;
    board.published = this.published;
    return board;
  }
}
