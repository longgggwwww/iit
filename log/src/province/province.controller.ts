import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DeleteProvinceDto } from "./dto/delete-province.dto";
import { FindProvinceDto } from "./dto/find-province.dto";
import { ProvinceService } from "./province.service";

@Controller("provinces")
export class ProvinceController {
  constructor(private province: ProvinceService) {}

  @Get()
  findAll(@Query() dto: FindProvinceDto) {
    return this.province.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.province.findOne(id);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteProvinceDto) {
    return this.province.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.province.remove(id);
  }
}
