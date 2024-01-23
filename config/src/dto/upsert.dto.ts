import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpsertDto {
  @IsNumber()
  @IsOptional()
  roleId?: number;

  @IsString()
  @IsOptional()
  thumbnail?: string;
}
