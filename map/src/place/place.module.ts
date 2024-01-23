import { Module } from "@nestjs/common";
import { CustomPrismaModule } from "nestjs-prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { PlaceController } from "./place.controller";
import { PlaceService } from "./place.service";
import { extendedPrismaClient } from "./prisma.extension";

@Module({
  imports: [
    CustomPrismaModule.forRootAsync({
      name: "POINT_PRISMA_SERVICE",
      useFactory: () => {
        return extendedPrismaClient;
      },
    }),
  ],
  controllers: [PlaceController],
  providers: [PlaceService, PrismaService],
})
export class PlaceModule {}
