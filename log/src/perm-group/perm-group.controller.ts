import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DeletePermGroupDto } from "./dto/delete-perm-group.dto";
import { FindPermGroupDto } from "./dto/find-perm-group.dto";
import { PermGroupService } from "./perm-group.service";

@Controller("perm-groups")
export class PermGroupController {
  constructor(private permGroup: PermGroupService) {}

  @Get()
  findAll(@Query() dto: FindPermGroupDto) {
    return this.permGroup.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.permGroup.findOne(id);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeletePermGroupDto) {
    return this.permGroup.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.permGroup.remove(id);
  }
}
