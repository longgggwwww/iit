import { Inject, Injectable } from "@nestjs/common";
import { CustomPrismaService } from "nestjs-prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePlaceDto } from "./dto/create-place.dto";
import { DeletePlaceDto } from "./dto/delete-place.dto";
import { FindPlaceDto } from "./dto/find-place.dto";
import { UpdatePlaceDto } from "./dto/update-place.dto";
import { ExtendedPrismaClient } from "./prisma.extension";

@Injectable()
export class PlaceService {
  constructor(
    private prisma: PrismaService,
    @Inject("POINT_PRISMA_SERVICE")
    private prismaExt: CustomPrismaService<ExtendedPrismaClient>
  ) {}

  async create({
    name,
    categoryId,
    lat,
    lng,
    wardId,
    address,
    description,
    email,
    phone,
    website,
    userId,
  }: CreatePlaceDto) {
    const place = await this.prisma.place.create({
      data: {
        name,
        category: {
          connect: {
            id: categoryId,
          },
        },
        lat,
        lng,
        wardId,
        address,
        description,
        email,
        phone,
        website,
        userId,
      },
      include: {
        category: {
          include: {
            _count: true,
          },
        },
      },
    });
    await this.prismaExt.client.point.create({
      placeId: place.id,
      latitude: place.lat,
      longitude: place.lng,
    });
    return place;
  }

  async findAll({ skip, take, cursor, sortField, sortOrder }: FindPlaceDto) {
    return this.prisma.place.findMany({
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
    return this.prisma.place.findUniqueOrThrow({
      where: { id },
      include: {
        _count: true,
      },
    });
  }

  async update(
    id: number,
    {
      name,
      categoryId,
      lat,
      lng,
      wardId,
      address,
      description,
      email,
      phone,
      website,
      userId,
    }: UpdatePlaceDto
  ) {
    const place = await this.prisma.place.update({
      where: { id },
      data: {
        name,
        category: categoryId
          ? {
              connect: {
                id: categoryId,
              },
            }
          : undefined,
        lat,
        lng,
        wardId,
        address,
        description,
        email,
        phone,
        website,
        userId,
      },
      include: {
        _count: true,
      },
    });
    // Handle update point by place
    return place;
  }

  async remove(id: number) {
    const [_, result] = await Promise.all([
      this.prismaExt.client.point.delete({
        where: { name: id.toString() },
      }),
      this.prisma.place.delete({
        where: { id },
      }),
    ]);
    return result;
  }

  async removeBatch({ ids }: DeletePlaceDto) {
    const [_, result] = await Promise.all([
      this.prismaExt.client.point.deleteMany({
        where: {
          name: {
            in: ids.map((id) => id.toString()),
          },
        },
      }),
      this.prisma.place.deleteMany({
        where: {
          id: { in: ids },
        },
      }),
    ]);
    return result;
  }

  // create(createPlaceDto: CreatePlaceDto) {
  //     return 'This action adds a new place'
  // }

  // async findAll() {
  //     console.log('go here')
  //     await this.prismaExt.client.point.create({
  //         placeId: 7,
  //         // latitude: 10.008745836550128,
  //         // longitude: 105.79196725676586,

  //         // latitude: 10.015609646049487,
  //         // longitude: 105.77669139100121,

  //         latitude: 10.018798421420575,
  //         longitude: 105.77022530292497,
  //         // latitude: 10.043821508739192,
  //         // longitude: 105.73442127157054,
  //     })
  //     return `This action returns all place`
  // }

  // findOne(id: number) {
  //     return this.prismaExt.client.point.findPointsWithinRadius(
  //         10.018798421420575,
  //         105.77022530292497,
  //         1000,
  //     )
  //     // return `This action returns a #${id} place`
  // }

  // update(id: number, updatePlaceDto: UpdatePlaceDto) {
  //     return `This action updates a #${id} place`
  // }

  // remove(id: number) {
  //     return `This action removes a #${id} place`
  // }
}
