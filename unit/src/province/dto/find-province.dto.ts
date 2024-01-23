import { Prisma } from "@prisma/client";
import { IsEnum, IsIn, IsNumber, IsOptional } from "class-validator";

export class FindProvinceDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsNumber()
  @IsOptional()
  cursor?: number;

  @IsIn(Object.keys(Prisma.ProvinceScalarFieldEnum))
  sortField: string = Prisma.ProvinceScalarFieldEnum.name;

  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  sortOrder?: Prisma.SortOrder = Prisma.SortOrder.asc;
}
