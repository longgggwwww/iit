import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DeleteRoleDto } from "./dto/delete-role.dto";
import { FindRoleDto } from "./dto/find-role.dto";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindRoleDto) {
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

  async removeBatch({ ids }: DeleteRoleDto) {
    return this.prisma.permissionGroup.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
