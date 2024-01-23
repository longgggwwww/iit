import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateWardDto } from "./dto/create-ward.dto";
import { DeleteWardDto } from "./dto/delete-ward.dto";
import { FindWardDto } from "./dto/find-ward.dto";
import { UpdateWardDto } from "./dto/update-ward.dto";

@Injectable()
export class WardService {
  constructor(private prisma: PrismaService) {}

  async create({ name, code, districtId, userId }: CreateWardDto) {
    return this.prisma.ward.create({
      data: {
        name,
        code,
        districtId,
        userId,
      },
      include: {
        District: {
          include: {
            _count: true,
            Province: {
              include: {
                _count: true,
              },
            },
            Ward: {
              take: 5,
              orderBy: {
                id: "desc",
              },
            },
          },
        },
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindWardDto) {
    return this.prisma.ward.findMany({
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
        District: {
          include: {
            _count: true,
            Province: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.ward.findUniqueOrThrow({
      where: { id },
      include: {
        District: {
          include: {
            _count: true,
            Province: true,
          },
        },
      },
    });
  }

  async update(id: number, { name, code, districtId }: UpdateWardDto) {
    return this.prisma.ward.update({
      where: { id },
      data: {
        name,
        code,
        District: districtId
          ? {
              connect: {
                id: districtId,
              },
            }
          : undefined,
      },
      include: {
        District: {
          include: {
            _count: true,
            Province: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.ward.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeleteWardDto) {
    return this.prisma.ward.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
