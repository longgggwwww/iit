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
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { FindCategoryDto } from "./dto/find-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";

@Injectable({ scope: Scope.REQUEST })
@Controller("categories")
export class CategoryController {
  constructor(
    private category: CategoryService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = "category";
    }
  }

  @Post()
  create(@Body() dto: CreateCategoryDto) {
    return this.category.create(dto);
  }

  @Get()
  findAll(@Query() dto: FindCategoryDto) {
    return this.category.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.category.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.category.update(+id, dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.category.remove(id);
  }
}
