import { Controller, Get } from "@nestjs/common";
import { PermissionService } from "./permission.service";

@Controller("permissions")
export class PermissionController {
  constructor(private permission: PermissionService) {}

  @Get()
  findAll() {
    return this.permission.findAll();
  }
}
