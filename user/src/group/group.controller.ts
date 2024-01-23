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
import { CreateGroupDto } from "./dto/create-group.dto";
import { DeleteGroupDto } from "./dto/delete-group.dto";
import { FindGroupDto } from "./dto/find-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";
import { GroupService } from "./group.service";

@Injectable({ scope: Scope.REQUEST })
@Controller("groups")
export class GroupController {
  constructor(
    private group: GroupService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = "permissionGroup";
    }
  }

  @Post()
  create(@Body() dto: CreateGroupDto) {
    return this.group.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindGroupDto) {
    return this.group.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.group.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateGroupDto) {
    return this.group.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteGroupDto) {
    return this.group.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.group.remove(id);
  }
}
