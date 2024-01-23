import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DeleteProvinceDto } from "./dto/delete-province.dto";
import { FindProvinceDto } from "./dto/find-province.dto";

@Injectable()
export class ProvinceService {
  constructor(private prisma: PrismaService) {}

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
    });
  }

  async findOne(id: number) {
    return this.prisma.province.findUniqueOrThrow({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.province.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeleteProvinceDto) {
    return this.prisma.province.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
