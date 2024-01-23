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
import { DepartmentService } from "./department.service";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { DeleteDepartmentDto } from "./dto/delete-department.dto";
import { FindDepartmentDto } from "./dto/find-department.dto";
import { UpdateDepartmentDto } from "./dto/update-department.dto";

@Injectable({ scope: Scope.REQUEST })
@Controller("departments")
export class DepartmentController {
  constructor(
    private department: DepartmentService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = "department";
    }
  }

  @Post()
  create(@Body() dto: CreateDepartmentDto) {
    return this.department.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindDepartmentDto) {
    return this.department.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.department.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateDepartmentDto,
  ) {
    return this.department.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteDepartmentDto) {
    return this.department.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.department.remove(id);
  }
}
