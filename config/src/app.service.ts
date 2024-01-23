import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { firstValueFrom } from "rxjs";
import { UpsertDto } from "./dto/upsert.dto";
import { PrismaService } from "./prisma/prisma.service";

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    @Inject("USER_SERVICE") private user: ClientProxy,
  ) {}

  ping() {
    return "Gretting from CONFIG SERVICE";
  }

  async find() {
    const conf = await this.prisma.config.findFirst();
    if (!conf) {
      return this.prisma.config.upsert({
        where: { id: 1 },
        create: {},
        update: {},
      });
    }
    if (conf.roleId) {
      const role = await firstValueFrom(
        this.user.send("role_findOne", conf.roleId),
      );
      if (role) {
        return { ...conf, role };
      }
    }
    return conf;
  }

  async upsert(dto: UpsertDto) {
    const conf = await this.prisma.config.upsert({
      where: {
        id: 1,
      },
      create: dto,
      update: dto,
    });

    if (conf.roleId) {
      const role = await firstValueFrom(
        this.user.send("role_findOne", conf.roleId),
      );
      if (role) {
        return { ...conf, role };
      }
    }
    return conf;
  }
}
