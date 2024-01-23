import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { DeleteRoleDto } from "./dto/delete-role.dto";
import { FindRoleDto } from "./dto/find-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create({ name, code, roleId, permissionIds, userId }: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        name,
        code,
        permissions:
          permissionIds && permissionIds.length > 0
            ? {
                connect: permissionIds.map((id) => ({ id })),
              }
            : undefined,
        successor: roleId
          ? {
              connect: {
                id: roleId,
              },
            }
          : undefined,
        user: userId
          ? {
              connect: {
                id: userId,
              },
            }
          : undefined,
      },
      include: {
        _count: true,
        successor: {
          include: {
            _count: true,
          },
        },
        permissions: {
          include: {
            _count: true,
          },
        },
        user: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindRoleDto) {
    return this.prisma.role.findMany({
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
      include: {
        _count: true,
        successor: {
          include: {
            _count: true,
          },
        },
        predecessor: {
          include: {
            _count: true,
          },
        },
        permissions: {
          include: {
            _count: true,
          },
        },
        users: true,
        user: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.role.findUniqueOrThrow({
      where: { id },
      include: {
        _count: true,
        successor: {
          include: {
            _count: true,
          },
        },
        predecessor: {
          include: {
            _count: true,
          },
        },
        permissions: {
          include: {
            _count: true,
          },
        },
        users: true,
        user: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    { name, code, roleId, permissionIds }: UpdateRoleDto
  ) {
    return this.prisma.role.update({
      where: { id },
      data: {
        name,
        code,
        successor: roleId
          ? {
              connect: {
                id: roleId,
              },
            }
          : undefined,
        permissions:
          permissionIds && permissionIds.length > 0
            ? {
                set: permissionIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        _count: true,
        successor: {
          include: {
            _count: true,
          },
        },
        predecessor: {
          include: {
            _count: true,
          },
        },
        permissions: {
          include: {
            _count: true,
          },
        },
        users: true,
        user: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.role.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeleteRoleDto) {
    return this.prisma.role.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
