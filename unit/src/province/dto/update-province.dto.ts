import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { CreateProvinceDto } from "./create-province.dto";

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  @IsArray()
  @IsOptional()
  districtIds: number[];
}
