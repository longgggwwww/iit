import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandService {
  constructor(private prisma: PrismaService) {}

  async create({ name }: CreateBrandDto) {
    return this.prisma.brand.create({
      data: {
        name,
      },
    });
  }

  async findAll() {
    return this.prisma.brand.findMany({});
  }

  async findOne(id: number) {
    return this.prisma.brand.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        _count: true,
      },
    });
  }

  async update(id: number, { name }: UpdateBrandDto) {
    return this.prisma.brand.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.brand.delete({
      where: {
        id,
      },
    });
  }

  async removeBatch(id: number) {
    return `This action removes a #${id} brand`;
  }
}
