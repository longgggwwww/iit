import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { DeleteCompanyDto } from "./dto/delete-company.dto";
import { FindCompanyDto } from "./dto/find-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";

@Injectable()
export class CompanyService {
  constructor(
    private prisma: PrismaService,
    @Inject("UNIT_SERVICE") private unit: ClientProxy
  ) {}

  async create({ name, email, phone, tax, wardId, userId }: CreateCompanyDto) {
    const company = await this.prisma.company.create({
      data: {
        name,
        email,
        phone,
        tax,
        wardId,
        userId,
      },
    });
    if (company.wardId) {
      const ward = await firstValueFrom(
        this.unit.send("ward_findOne", company.wardId)
      );
      return { ...company, ward };
    }
    return company;
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindCompanyDto) {
    return this.prisma.company.findMany({
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
      },
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUniqueOrThrow({
      where: { id },
      include: {
        _count: true,
        departments: {
          include: {
            _count: true,
          },
        },
      },
    });
    if (company.wardId) {
      const ward = await firstValueFrom(
        this.unit.send("ward_findOne", company.wardId)
      );
      return { ...company, ward };
    }
    return company;
  }

  async update(
    id: number,
    { name, phone, email, tax, wardId, departmentIds }: UpdateCompanyDto
  ) {
    const company = await this.prisma.company.update({
      where: { id },
      data: {
        name,
        phone,
        email,
        tax,
        wardId,
        departments:
          departmentIds && departmentIds.length > 0
            ? {
                set: departmentIds.map((id) => ({ id })),
              }
            : undefined,
      },
      include: {
        _count: true,
        departments: {
          include: {
            _count: true,
          },
        },
      },
    });
    if (company.wardId) {
      const ward = await firstValueFrom(
        this.unit.send("ward_findOne", company.wardId)
      );
      return { ...company, ward };
    }
    return company;
  }

  async remove(id: number) {
    return this.prisma.company.delete({
      where: { id },
    });
  }

  async removeBatch({ ids }: DeleteCompanyDto) {
    return this.prisma.company.deleteMany({
      where: {
        id: { in: ids },
      },
    });
  }
}
