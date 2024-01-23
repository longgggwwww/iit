import { Body, Controller, Get, Patch } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { UpsertDto } from "./dto/upsert.dto";

@Controller()
export class AppController {
  constructor(private app: AppService) {}

  @Get()
  ping() {
    return this.app.ping();
  }

  @Get("settings")
  find() {
    return this.app.find();
  }

  @Patch("settings")
  update(@Body() dto: UpsertDto) {
    return this.app.upsert(dto);
  }

  // ----------- Microservice ---------------

  @MessagePattern("settings")
  settings() {
    try {
      return this.app.find();
    } catch {
      return null;
    }
  }
}
