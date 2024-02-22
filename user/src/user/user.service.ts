import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({ username, password }: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hash,
        type: "BUSINESS",
        role: {
          connect: {
            code: "everyone",
          },
        },
      },
    });
    return user;
  }

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
      include: {
        _count: true,
        role: {
          include: {
            _count: true,
          },
        },
        createdRoles: {
          take: 5,
          orderBy: {
            name: "asc",
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        _count: true,
        role: {
          include: {
            _count: true,
          },
        },
        createdRoles: {
          take: 5,
          orderBy: {
            name: "asc",
          },
        },
      },
    });
  }

  async update(id: number, { username, password }: UpdateUserDto) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        username,
      },
      include: {
        role: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch({ ids }: DeleteUserDto) {
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
