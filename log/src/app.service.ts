import { Injectable } from "@nestjs/common";
import { LogDto } from "./event/log.event";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  ping() {
    return "Greeting from LOG SERVICE";
  }

  async createLog({ entity, ...data }: LogDto) {
    if (this.prisma[entity]) {
      return this.prisma[entity].create({ data });
    }
  }
}
