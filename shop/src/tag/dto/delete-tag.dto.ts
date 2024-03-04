import { IsArray, IsNumber } from 'class-validator';

export class DeleteTagDto {
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
