import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateRoleDto } from './dto/create-role.dto';
import { DeleteRoleDto } from './dto/delete-role.dto';
import { FindRoleDto } from './dto/find-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async create({ name, code, permissions }: CreateRoleDto) {
    return this.prisma.role.create({
      data: {
        name,
        code,
        permissions,
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindRoleDto) {
    throw new NotFoundException();
    // return this.prisma.role.findMany({
    //   skip,
    //   take,
    //   cursor: cursor
    //     ? {
    //         id: cursor,
    //       }
    //     : undefined,
    //   orderBy: sortField
    //     ? {
    //         [`${sortField}`]: sortOrder,
    //       }
    //     : undefined,
    //   include: {
    //     _count: true,
    //     users: {
    //       include: {
    //         profile: true,
    //       },
    //     },
    //   },
    // });
  }

  async findOne(id: number) {
    return this.prisma.role.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        _count: true,
      },
    });
  }

  async update(id: number, { name, code, permissions }: UpdateRoleDto) {
    return this.prisma.role.update({
      where: {
        id,
      },
      data: {
        name,
        code,
        permissions,
      },
      include: {
        _count: true,
        users: {
          take: 5,
          orderBy: {
            profile: {
              name: 'asc',
            },
          },
          include: {
            _count: true,
            profile: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.role.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch({ ids }: DeleteRoleDto) {
    return this.prisma.role.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
