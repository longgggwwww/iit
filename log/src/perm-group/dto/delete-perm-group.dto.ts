import { IsArray, IsNumber } from "class-validator";

export class DeletePermGroupDto {
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
