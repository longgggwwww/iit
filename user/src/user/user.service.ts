import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import * as bcrypt from "bcrypt";
import { firstValueFrom } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { DeleteUserDto } from "./dto/delete-user.dto";
import { FindUserDto } from "./dto/find-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    @Inject("CFG_SERVICE") private cfg: ClientProxy
  ) {}

  async create({ username, password, createdById }: CreateUserDto) {
    const { role } = await firstValueFrom(this.cfg.send("settings", {}));
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hash,
        role: {
          connect: {
            id: role.id,
          },
        },
        type: "business",
        provider: "local",
        gender: "female",
      },
      include: {
        role: {
          include: {
            _count: true,
            permissions: true,
          },
        },
      },
    });
    return { ...user, role };
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
        role: {
          include: {
            _count: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
      include: {
        role: {
          include: {
            _count: true,
            permissions: true,
          },
        },
      },
    });
  }

  async update(id: number, { username, password }: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        username,
      },
      include: {
        role: {
          include: {
            _count: true,
            permissions: true,
          },
        },
      },
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
