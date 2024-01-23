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
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { DeleteCompanyDto } from "./dto/delete-company.dto";
import { FindCompanyDto } from "./dto/find-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable({ scope: Scope.REQUEST })
@Controller("companies")
export class CompanyController {
  constructor(
    private company: CompanyService,
    @Inject(REQUEST) private req: any,
  ) {
    if (req.headers) {
      req.headers.entity = "company";
    }
  }

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.company.create({
      ...dto,
      userId: this.req.user?.id,
    });
  }

  @Get()
  findAll(@Query() dto: FindCompanyDto) {
    return this.company.findAll(dto);
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.company.findOne(id);
  }

  @Patch(":id")
  update(@Param("id", ParseIntPipe) id: number, @Body() dto: UpdateCompanyDto) {
    return this.company.update(id, dto);
  }

  @Delete("batch")
  removeMany(@Body() dto: DeleteCompanyDto) {
    return this.company.removeBatch(dto);
  }

  @Delete(":id")
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.company.remove(id);
  }

  // ----------- Microservice ---------------

  @MessagePattern("company_findOne")
  _findOne(@Payload() id: number) {
    return this.company.findOne(id);
  }
}
