import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DeleteWardDto } from "./dto/delete-ward.dto";
import { FindWardDto } from "./dto/find-ward.dto";

@Injectable()
export class WardService {
  constructor(private prisma: PrismaService) {}

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
    });
  }

  async findOne(id: number) {
    return this.prisma.ward.findUniqueOrThrow({
      where: { id },
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
