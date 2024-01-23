import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { FindUserDto } from "./dto/find-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindUserDto) {
    return this.prisma.user.findMany({
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
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeleteUserDto) {
    return this.prisma.user.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
