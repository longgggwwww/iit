import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePositionDto } from "./dto/create-position.dto";
import { DeletePositionDto } from "./dto/delete-position.dto";
import { FindPositionDto } from "./dto/find-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";

@Injectable()
export class PositionService {
  constructor(private prisma: PrismaService) {}

  async create({ name, code, departmentId, userId }: CreatePositionDto) {
    return this.prisma.position.create({
      data: {
        name,
        code,
        department: {
          connect: {
            id: departmentId,
          },
        },
        userId,
      },
      include: {
        department: {
          include: {
            _count: true,
            company: true,
          },
        },
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindPositionDto) {
    return this.prisma.position.findMany({
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
        department: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.position.findUniqueOrThrow({
      where: { id },
      include: {
        department: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async update(id: number, { name, code, departmentId }: UpdatePositionDto) {
    return this.prisma.position.update({
      where: { id },
      data: {
        name,
        code,
        department: departmentId
          ? {
              connect: {
                id: departmentId,
              },
            }
          : undefined,
      },
      include: {
        department: {
          include: {
            company: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.position.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeletePositionDto) {
    return this.prisma.position.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
