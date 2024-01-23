import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private user: UserService) {}

  @Get()
  findAll(@Query() dto: FindUserDto) {
    return this.user.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.user.findOne(id);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteUserDto) {
    return this.user.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.user.remove(id);
  }
}
