import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create({
    site,
    username,
    password,
    roleId,
    isActive,
    isAdmin,
  }: CreateUserDto) {
    console.log({
      site,
      username,
      password,
      roleId,
      isActive,
      isAdmin,
    });
    return this.prisma.user.create({
      data: {
        site,
        username,
        password,
        roleId,
        isAdmin,
        isActive,
      },
      include: {
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return this.prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        profile: true,
        role: {
          select: {
            id: true,
            code: true,
            name: true,
          },
        },
      },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    return 'pending...';
  }

  async removeMany(ids: number[]) {
    return this.prisma.user.deleteMany({
      where: {
        id: {
          in: ids,
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
}
