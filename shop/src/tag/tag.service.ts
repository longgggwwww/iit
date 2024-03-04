import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateTagDto } from './dto/create-tag.dto';
import { DeleteTagDto } from './dto/delete-tag.dto';
import { FindTagDto } from './dto/find-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  async create({ label }: CreateTagDto) {
    return this.prisma.tag.create({
      data: {
        label,
      },
    });
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindTagDto) {
    return this.prisma.tag.findMany({
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
        products: {
          take: 5,
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.tag.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        products: {
          take: 5,
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async update(id: number, { label, productIds }: UpdateTagDto) {
    return this.prisma.tag.update({
      where: {
        id,
      },
      data: {
        label,
        // products:
        //   productIds && productIds.length > 0
        //     ? {
        //         set: productIds.map((id) => ({ id })),
        //       }
        //     : undefined,
      },
      include: {
        products: {
          take: 5,
          orderBy: {
            id: 'asc',
          },
        },
      },
    });
  }

  async remove(id: number) {
    return this.prisma.tag.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch({ ids }: DeleteTagDto) {
    return this.prisma.tag.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
