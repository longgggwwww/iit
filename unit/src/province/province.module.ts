import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProvinceController } from "./province.controller";
import { ProvinceService } from "./province.service";

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService, PrismaService],
})
export class ProvinceModule {}
