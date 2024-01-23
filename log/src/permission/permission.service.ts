import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DeletePermissionDto } from "./dto/delete-permission.dto";
import { FindPermissionDto } from "./dto/find-permission.dto";

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    cursor,
    sortField,
    sortOrder,
  }: FindPermissionDto) {
    return this.prisma.permission.findMany({
      skip,
      take,
      cursor: cursor
        ? {
            id: cursor,
          }
        : undefined,
      orderBy: sortField
        ? {
            [`${sortField}`]: sortOrder,
          }
        : undefined,
    });
  }

  async findOne(id: number) {
    return this.prisma.permission.findUniqueOrThrow({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.permission.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeletePermissionDto) {
    return this.prisma.permission.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
