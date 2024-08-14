import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UserFacade } from 'src/user/pattern/user.facade';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './entity/board.entity';
import { BoardBuilder } from './pattern/board.builder';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    private readonly userFacade: UserFacade,
  ) {}

  async createBoard(request: Request, createBoardDto: CreateBoardDto) {
    const user = await this.userFacade.getUser(request);

    const board = new BoardBuilder()
      .setTitle(createBoardDto.title)
      .setContent(createBoardDto.content)
      .setUser(user)
      .setPublished(new Date())
      .build();

    this.boardRepository.save(board);
  }

  async getPostList(count: number) {
    const boards = await this.boardRepository.find({
      order: { published: 'DESC' },
      take: count,
      relations: ['user'],
    });

    return boards.map((board) => ({
      id: board.id,
      title: board.title,
      content: board.content,
      published: board.published,
      userId: board.user.id,
    }));
  }
}
