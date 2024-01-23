import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNumber, IsOptional } from "class-validator";
import { CreateGroupDto } from "./create-group.dto";

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsNumber(
    {
      allowInfinity: false,
      allowNaN: false,
    },
    { each: true },
  )
  @IsArray()
  @IsOptional()
  permissionIds: number[];
}
