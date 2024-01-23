import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
    constructor(private app: AppService) {}

    @Get()
    ping() {
        return this.app.ping()
    }
}