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
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateRoleDto } from "./dto/create-role.dto";
import { DeleteRoleDto } from "./dto/delete-role.dto";
import { FindRoleDto } from "./dto/find-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { RoleService } from "./role.service";

@Injectable({ scope: Scope.REQUEST })
@Controller("roles")
export class RoleController {
  constructor(
    private role: RoleService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = "role";
    }
  }

  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.role.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindRoleDto) {
    return this.role.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.role.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateRoleDto) {
    return this.role.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteRoleDto) {
    return this.role.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.role.remove(id);
  }

  // ----------- Microservice ---------------

  @MessagePattern("role_findOne")
  async _findOne(@Payload() id: number) {
    try {
      return await this.role.findOne(id);
    } catch {
      return null;
    }
  }
}
