import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProvinceDto } from "./dto/create-province.dto";
import { DeleteProvinceDto } from "./dto/delete-province.dto";
import { FindProvinceDto } from "./dto/find-province.dto";
import { UpdateProvinceDto } from "./dto/update-province.dto";

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

  async create({ name, code, userId }: CreateProvinceDto) {
    return this.prisma.province.create({
      data: {
        name,
        code,
        userId,
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindProvinceDto) {
    return this.prisma.province.findMany({
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
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.province.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        _count: true,
        District: {
          take: 5,
          orderBy: {
            name: "asc",
          },
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async update(id: number, { name, code, districtIds }: UpdateProvinceDto) {
    return this.prisma.province.update({
      where: {
        id,
      },
      data: {
        name,
        code,
        District:
          districtIds && districtIds.length > 0
            ? {
                set: districtIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        _count: true,
        District: {
          take: 5,
          orderBy: {
            name: "asc",
          },
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.province.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch({ ids }: DeleteProvinceDto) {
    return this.prisma.province.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
