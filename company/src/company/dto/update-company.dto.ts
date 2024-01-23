import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { CreateCompanyDto } from "./create-company.dto";

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  @IsArray()
  @IsOptional()
  departmentIds: number[];
}
