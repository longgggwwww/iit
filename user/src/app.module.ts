import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
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
      ],
    }),
    RoleModule,
    UserModule,
    PermissionModule,
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
  constructor(@Inject("LOG_SERVICE") private log: ClientProxy) {}

  async onApplicationBootstrap() {
    await Promise.allSettled([this.log.connect()]);
  }
}
