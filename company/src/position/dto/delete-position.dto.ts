import { IsArray, IsNumber } from "class-validator";

export class DeletePositionDto {
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
