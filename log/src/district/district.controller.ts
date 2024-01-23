import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { DistrictService } from "./district.service";
import { DeleteDistrictDto } from "./dto/delete-district.dto";
import { FindDistrictDto } from "./dto/find-district.dto";

@Controller("districts")
export class DistrictController {
  constructor(private district: DistrictService) {}

  @Get()
  findAll(@Query() dto: FindDistrictDto) {
    return this.district.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.district.findOne(id);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteDistrictDto) {
    return this.district.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.district.remove(id);
  }
}
