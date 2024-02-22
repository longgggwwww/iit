import { IsArray, IsNumber } from "class-validator";

export class DeleteUserDto {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true }
  )
  @IsArray()
  ids: number[];
}
