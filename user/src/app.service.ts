import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  ping() {
    return "Greeting from USER SERVICE";
  }
}
