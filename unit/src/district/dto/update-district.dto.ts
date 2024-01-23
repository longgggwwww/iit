import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { CreateDistrictDto } from "./create-district.dto";

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  @IsArray()
  @IsOptional()
  wardIds: number[];
}
