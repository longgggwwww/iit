import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
import { DistrictService } from "./district.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { DeleteDistrictDto } from "./dto/delete-district.dto";
import { FindDistrictDto } from "./dto/find-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Injectable({ scope: Scope.REQUEST })
@Controller("districts")
export class DistrictController {
  constructor(
    private district: DistrictService,
    @Inject(REQUEST) private req: any
  ) {
    if (req.headers) {
      req.headers.entity = "district";
    }
  }

  @Post()
  create(@Body() dto: CreateDistrictDto) {
    return this.district.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindDistrictDto) {
    return this.district.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.district.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateDistrictDto
  ) {
    return this.district.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteDistrictDto) {
    return this.district.removeBatch(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.district.remove(id);
  }
}
