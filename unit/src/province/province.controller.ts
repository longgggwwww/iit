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
import { CreateProvinceDto } from "./dto/create-province.dto";
import { DeleteProvinceDto } from "./dto/delete-province.dto";
import { FindProvinceDto } from "./dto/find-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";
import { ProvinceService } from "./province.service";

@Injectable({ scope: Scope.REQUEST })
@Controller("provinces")
export class ProvinceController {
  constructor(
    private province: ProvinceService,
    @Inject(REQUEST) private req: any
  ) {
    if (req.headers) {
      req.headers.entity = "province";
    }
  }

  @Post()
  create(@Body() dto: CreateProvinceDto) {
    return this.province.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindProvinceDto) {
    return this.province.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.province.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProvinceDto
  ) {
    return this.province.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteProvinceDto) {
    return this.province.removeBatch(dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.province.remove(id);
  }
}
