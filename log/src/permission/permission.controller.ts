import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DeletePermissionDto } from "./dto/delete-permission.dto";
import { FindPermissionDto } from "./dto/find-permission.dto";
import { PermissionService } from "./permission.service";

@Controller("permissions")
export class PermissionController {
  constructor(private permission: PermissionService) {}

  @Get()
  findAll(@Query() dto: FindPermissionDto) {
    return this.permission.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.permission.findOne(id);
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
