import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DeletePermGroupDto } from "./dto/delete-perm-group.dto";
import { FindPermGroupDto } from "./dto/find-perm-group.dto";

@Injectable()
export class PermGroupService {
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip,
    take,
    cursor,
    sortField,
    sortOrder,
  }: FindPermGroupDto) {
    return this.prisma.permissionGroup.findMany({
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
    return this.prisma.permissionGroup.findUniqueOrThrow({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.permissionGroup.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeletePermGroupDto) {
    return this.prisma.permissionGroup.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
