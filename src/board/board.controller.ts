import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  getPostList(@Query('count') count: number) {
    return this.boardService.getPostList(count);
  }

  @Post()
  @UseGuards(AuthGuard)
  @HttpCode(200)
  create(@Req() request: Request, @Body() createBoardDto: CreateBoardDto) {
    return this.boardService.createBoard(request, createBoardDto);
  }
}
