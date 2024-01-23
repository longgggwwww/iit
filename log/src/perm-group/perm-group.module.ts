import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PermGroupController } from "./perm-group.controller";
import { PermGroupService } from "./perm-group.service";

@Module({
  controllers: [PermGroupController],
  providers: [PermGroupService, PrismaService],
})
export class PermGroupModule {}
