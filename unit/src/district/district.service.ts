import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { DeleteDistrictDto } from "./dto/delete-district.dto";
import { FindDistrictDto } from "./dto/find-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";

@Injectable()
export class DistrictService {
  constructor(private prisma: PrismaService) {}

  async create({ name, code, provinceId, userId }: CreateDistrictDto) {
    return this.prisma.district.create({
      data: {
        name,
        code,
        provinceId,
        userId,
      },
      include: {
        province: {
          include: {
            _count: true,
            district: {
              take: 5,
              orderBy: {
                name: "asc",
              },
            },
          },
        },
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindDistrictDto) {
    return this.prisma.district.findMany({
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
        province: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.district.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        _count: true,
        province: {
          include: {
            _count: true,
            district: {
              take: 5,
              orderBy: {
                name: "asc",
              },
            },
          },
        },
        ward: {
          take: 5,
          orderBy: {
            name: "asc",
          },
        },
      },
    });
  }

  async update(
    id: number,
    { name, code, provinceId, wardIds }: UpdateDistrictDto
  ) {
    return this.prisma.district.update({
      where: {
        id,
      },
      data: {
        name,
        code,
        province: provinceId
          ? {
              connect: {
                id: provinceId,
              },
            }
          : undefined,
        ward:
          wardIds && wardIds.length > 0
            ? {
                set: wardIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        _count: true,
        province: {
          include: {
            _count: true,
            district: {
              take: 5,
              orderBy: {
                name: "asc",
              },
            },
          },
        },
        ward: {
          take: 5,
          orderBy: {
            name: "asc",
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.district.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch({ ids }: DeleteDistrictDto) {
    return this.prisma.district.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
