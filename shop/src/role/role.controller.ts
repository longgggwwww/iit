import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CreateRoleDto } from './dto/create-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly role: RoleService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = 'role';
    }
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.role.create(dto);
  }

  @Get()
  findAll(@Query() dto: FindRoleDto) {
    return this.role.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.role.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoleDto) {
    return this.role.update(id, dto);
  }

  @Delete('batch')
  removeMany(@Body() dto: DeleteRoleDto) {
    return this.role.removeBatch(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.role.remove(id);
  }
}
