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
import { CreateWardDto } from "./dto/create-ward.dto";
import { DeleteWardDto } from "./dto/delete-ward.dto";
import { FindWardDto } from "./dto/find-ward.dto";
import { UpdateWardDto } from "./dto/update-ward.dto";
import { WardService } from "./ward.service";

@Injectable({ scope: Scope.REQUEST })
@Controller("wards")
export class WardController {
  constructor(
    private ward: WardService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = "ward";
    }
  }

  @Post()
  create(@Body() dto: CreateWardDto) {
    return this.ward.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindWardDto) {
    return this.ward.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.ward.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateWardDto) {
    return this.ward.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteWardDto) {
    return this.ward.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.ward.remove(id);
  }

  // ----------- Microservice ---------------

  @MessagePattern({ pattern: "ward", cmd: "findOne" })
  async _findOne(@Payload() id: number) {
    try {
      return await this.ward.findOne(id);
    } catch {
      return null;
    }
  }
}
