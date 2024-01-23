import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GroupModule } from "./group/group.module";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { PermissionModule } from "./permission/permission.module";
import { RoleModule } from "./role/role.module";
import { UserModule } from "./user/user.module";

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
          name: "CFG_SERVICE",
          useFactory: (cfg: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [`${cfg.get("CFG_RB_URL")}`],
                queue: `${cfg.get("CFG_QUEUE")}`,
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
    GroupModule,
    PermissionModule,
    RoleModule,
    UserModule,
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
    @Inject("CFG_SERVICE") private cfg: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await Promise.allSettled([this.log.connect(), this.cfg.connect()]);
  }
}
