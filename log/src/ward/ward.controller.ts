import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DeleteWardDto } from "./dto/delete-ward.dto";
import { FindWardDto } from "./dto/find-ward.dto";
import { WardService } from "./ward.service";

@Controller("wards")
export class WardController {
  constructor(private ward: WardService) {}

  @Get()
  findAll(@Query() dto: FindWardDto) {
    return this.ward.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ward.findOne(id);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteWardDto) {
    return this.ward.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.ward.remove(id);
  }
}
