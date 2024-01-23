import { Prisma } from "@prisma/client";
import { IsEnum, IsIn, IsNumber, IsOptional } from "class-validator";

export class FindDistrictDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsNumber()
  @IsOptional()
  cursor?: number;

  @IsIn(Object.keys(Prisma.DistrictScalarFieldEnum))
  sortField: string = Prisma.DistrictScalarFieldEnum.name;

  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  sortOrder?: Prisma.SortOrder = Prisma.SortOrder.asc;
}
