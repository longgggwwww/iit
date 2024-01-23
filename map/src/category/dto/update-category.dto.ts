import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber } from "class-validator";
import { CreateCategoryDto } from "./create-category.dto";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsNumber(
    {
      allowNaN: false,
      allowInfinity: false,
    },
    { each: true },
  )
  @IsArray()
  placeIds: number[];
}
