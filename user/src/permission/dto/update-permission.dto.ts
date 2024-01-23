import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { CreatePermissionDto } from "./create-permission.dto";

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  @IsArray()
  @IsOptional()
  roleIds: number[];
}
