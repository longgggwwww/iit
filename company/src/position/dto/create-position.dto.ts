import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePositionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  departmentId: number;

  userId?: number;
}
