import { IsArray, IsNumber } from "class-validator";

export class DeleteCategoryDto {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  @IsArray()
  ids: number[];
}
