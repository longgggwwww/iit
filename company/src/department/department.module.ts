import { Module } from "@nestjs/common";
import { CompanyService } from "src/company/company.service";
import { PrismaService } from "src/prisma/prisma.service";
import { DepartmentController } from "./department.controller";
import { DepartmentService } from "./department.service";

@Module({
  controllers: [DepartmentController],
  providers: [DepartmentService, PrismaService, CompanyService],
})
export class DepartmentModule {}
