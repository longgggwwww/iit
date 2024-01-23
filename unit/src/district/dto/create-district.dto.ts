import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDistrictDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  provinceId: number;

  userId?: number;
}
