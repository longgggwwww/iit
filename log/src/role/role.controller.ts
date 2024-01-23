import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DeleteRoleDto } from "./dto/delete-role.dto";
import { FindRoleDto } from "./dto/find-role.dto";
import { RoleService } from "./role.service";

@Controller("roles")
export class RoleController {
  constructor(private role: RoleService) {}

  @Get()
  findAll(@Query() dto: FindRoleDto) {
    return this.role.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.role.findOne(id);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteRoleDto) {
    return this.role.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.role.remove(id);
  }
}
