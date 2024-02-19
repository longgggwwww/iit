import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { DeleteGroupDto } from "./dto/delete-group.dto";
import { FindGroupDto } from "./dto/find-group.dto";
import { UpdateGroupDto } from "./dto/update-group.dto";

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async create({ name, createdById }: CreateGroupDto) {
    return this.prisma.group.create({
      data: {
        name,
        createdById,
      },
      include: {
        createdBy: true,
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindGroupDto) {
    return this.prisma.group.findMany({
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
        createdBy: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.group.findUniqueOrThrow({
      where: { id },
      include: {
        _count: true,
        createdBy: true,
        permissions: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async update(id: number, { name, permissionIds }: UpdateGroupDto) {
    return this.prisma.group.update({
      where: { id },
      data: {
        name,
        permissions:
          permissionIds && permissionIds.length > 0
            ? {
                set: permissionIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        _count: true,
        createdBy: true,
        permissions: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.group.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeleteGroupDto) {
    return this.prisma.group.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
