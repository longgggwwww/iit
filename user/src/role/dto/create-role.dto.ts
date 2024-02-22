import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString({ each: true })
  @IsArray()
  @IsNotEmpty()
  permissions: string[];

  userId?: number;
}
