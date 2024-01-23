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
import { CreatePositionDto } from "./dto/create-position.dto";
import { DeletePositionDto } from "./dto/delete-position.dto";
import { FindPositionDto } from "./dto/find-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";
import { PositionService } from "./position.service";

@Injectable({ scope: Scope.REQUEST })
@Controller("positions")
export class PositionController {
  constructor(
    private position: PositionService,
    @Inject(REQUEST) private req: any
  ) {
    if (req.headers) {
      req.headers.entity = "position";
    }
  }

  @Post()
  create(@Body() dto: CreatePositionDto) {
    return this.position.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindPositionDto) {
    return this.position.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.position.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdatePositionDto
  ) {
    return this.position.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeletePositionDto) {
    return this.position.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.position.remove(id);
  }

  // ----------- Microservice ---------------

  @MessagePattern("position_findOne")
  async _findOne(@Payload() id: number) {
    try {
      return await this.position.findOne(id);
    } catch {
      return null;
    }
  }
}
