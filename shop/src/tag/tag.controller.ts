import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreateTagDto } from './dto/create-tag.dto';
import { DeleteTagDto } from './dto/delete-tag.dto';
import { FindTagDto } from './dto/find-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

@Injectable({ scope: Scope.REQUEST })
@Controller('tags')
export class TagController {
  constructor(
    private tag: TagService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = 'tag';
    }
  }

  @Post()
  create(@Body() dto: CreateTagDto) {
    return this.tag.create(dto);
  }

  @Get()
  findAll(@Query() dto: FindTagDto) {
    return this.tag.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.tag.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateTagDto) {
    return this.tag.update(id, dto);
  }

  @Delete('batch')
  removeMany(@Body() dto: DeleteTagDto) {
    return this.tag.removeBatch(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.tag.remove(id);
  }
}
