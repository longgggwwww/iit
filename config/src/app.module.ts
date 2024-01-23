import { Inject, Module, OnApplicationBootstrap } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ClientProxy, ClientsModule, Transport } from "@nestjs/microservices";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { LoggingInterceptor } from "./interceptors/logging.interceptor";
import { PrismaService } from "./prisma/prisma.service";

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
          name: "USER_SERVICE",
          useFactory: (cfg: ConfigService) => {
            return {
              transport: Transport.RMQ,
              options: {
                urls: [`${cfg.get("USER_RB_URL")}`],
                queue: `${cfg.get("USER_QUEUE")}`,
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
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    @Inject("LOG_SERVICE") private log: ClientProxy,
    @Inject("USER_SERVICE") private user: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await Promise.allSettled([this.log.connect(), this.user.connect()]);
  }
}
