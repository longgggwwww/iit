import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  groupId: number;

  createdById?: number;
}
