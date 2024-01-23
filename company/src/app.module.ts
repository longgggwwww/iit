import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CompanyModule } from "./company/company.module";
import { DepartmentModule } from "./department/department.module";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { PositionModule } from "./position/position.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ClientsModule.registerAsync({
      isGlobal: true,
      clients: [
        {
          name: "LOG_SERVICE",
          useFactory: (cfg: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [`${cfg.get("LOG_RB_URL")}`],
                queue: `${cfg.get("LOG_QUEUE")}`,
                queueOptions: {
                  durable: true,
                },
              },
            };
          },
          inject: [ConfigService],
        },
        {
          name: "UNIT_SERVICE",
          useFactory: (cfg: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [`${cfg.get("UNIT_RB_URL")}`],
                queue: `${cfg.get("UNIT_QUEUE")}`,
                queueOptions: {
                  durable: true,
                },
              },
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
    CompanyModule,
    DepartmentModule,
    PositionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    @Inject("LOG_SERVICE") private log: ClientProxy,
    @Inject("UNIT_SERVICE") private unit: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await Promise.allSettled([this.log.connect(), this.unit.connect()]);
  }
}
