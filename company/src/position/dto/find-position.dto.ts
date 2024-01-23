import { Prisma } from "@prisma/client";
import {
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";

export class FindPositionDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsNumber()
  @IsOptional()
  cursor?: number;

  @IsNotEmpty()
  @IsIn(Object.keys(Prisma.PositionScalarFieldEnum))
  @IsOptional()
  sortField?: string;

  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  sortOrder?: Prisma.SortOrder = Prisma.SortOrder.asc;
}