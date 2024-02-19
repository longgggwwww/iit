import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { DeletePermissionDto } from "./dto/delete-permission.dto";
import { FindPermissionDto } from "./dto/find-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { PermissionService } from "./permission.service";

@Injectable({ scope: Scope.REQUEST })
@Controller("permissions")
export class PermissionController {
  constructor(
    private permission: PermissionService,
    @Inject(REQUEST) private req: any
  ) {
    if (req.headers) {
      req.headers.entity = "permission";
    }
  }

  @Post()
  create(@Body() dto: CreatePermissionDto) {
    return this.permission.create({
      ...dto,
      createdById: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindPermissionDto) {
    return this.permission.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.permission.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePermissionDto
  ) {
    return this.permission.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeletePermissionDto) {
    return this.permission.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.permission.remove(id);
  }
}
