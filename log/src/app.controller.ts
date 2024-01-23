import { Controller, Get } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";
import { LogDto } from "./event/log.event";

@Controller()
export class AppController {
  constructor(private app: AppService) {}

  @Get()
  ping() {
    return this.app.ping();
  }

  // ----------- Microservice ---------------

  @EventPattern("log")
  createLog(@Payload() data: LogDto) {
    this.app.createLog(data);
  }
}
