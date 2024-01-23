import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateWardDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  districtId: number;

  userId?: number;
}
