import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { CreateDepartmentDto } from "./create-department.dto";

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  @IsArray()
  @IsOptional()
  positionIds: number[];
}
