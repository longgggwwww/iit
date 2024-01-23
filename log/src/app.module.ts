import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DistrictModule } from "./district/district.module";
import { PermGroupModule } from "./perm-group/perm-group.module";
import { PermissionModule } from "./permission/permission.module";
import { PrismaService } from "./prisma/prisma.service";
import { ProvinceModule } from "./province/province.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";
import { WardModule } from "./ward/ward.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    WardModule,
    ProvinceModule,
    DistrictModule,
    PermGroupModule,
    PermissionModule,
    RoleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
