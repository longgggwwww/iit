import { IsArray, IsNumber } from "class-validator";

export class DeleteWardDto {
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
