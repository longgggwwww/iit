import { Prisma } from '@prisma/client';
import { IsEnum, IsIn, IsNumber, IsOptional } from 'class-validator';

export class FindRoleDto {
  @IsNumber()
  @IsOptional()
  skip?: number;

  @IsNumber()
  @IsOptional()
  take?: number;

  @IsNumber()
  @IsOptional()
  cursor?: number;

  @IsIn(Object.keys(Prisma.RoleScalarFieldEnum))
  sortField: string = Prisma.RoleScalarFieldEnum.id;

  @IsEnum(Prisma.SortOrder)
  @IsOptional()
  sortOrder?: Prisma.SortOrder = Prisma.SortOrder.asc;
}
