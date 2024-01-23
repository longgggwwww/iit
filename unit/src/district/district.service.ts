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
        Province: {
          include: {
            _count: true,
            District: {
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
        Province: {
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
        Province: {
          include: {
            _count: true,
            District: {
              take: 5,
              orderBy: {
                name: "asc",
              },
            },
          },
        },
        Ward: {
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
        Province: provinceId
          ? {
              connect: {
                id: provinceId,
              },
            }
          : undefined,
        Ward:
          wardIds && wardIds.length > 0
            ? {
                set: wardIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        _count: true,
        Province: {
          include: {
            _count: true,
            District: {
              take: 5,
              orderBy: {
                name: "asc",
              },
            },
          },
        },
        Ward: {
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
