import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { WardController } from "./ward.controller";
import { WardService } from "./ward.service";

@Module({
  controllers: [WardController],
  providers: [WardService, PrismaService],
})
export class WardModule {}
