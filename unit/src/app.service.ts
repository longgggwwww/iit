import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  ping() {
    return "Gretting from UNIT SERVICE";
  }
}
