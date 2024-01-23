import { Inject, Module, OnApplicationBootstrap } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices'
import { MulterModule } from '@nestjs/platform-express'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CloudinaryModule } from './cloudinary/cloudinary.module'
import { LoggingInterceptor } from './interceptors/logging.interceptor'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MulterModule,
        ClientsModule.registerAsync({
            isGlobal: true,
            clients: [
                {
                    name: 'LOG_SERVICE',
                    useFactory: (config: ConfigService) => {
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [`${config.get('LOG_RB_URL')}`],
                                queue: `${config.get('LOG_QUEUE')}`,
                                queueOptions: {
                                    durable: true,
                                },
                            },
                        }
                    },
                    inject: [ConfigService],
                },
                {
                    name: 'USER_SERVICE',
                    useFactory: (config: ConfigService) => {
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [`${config.get('USER_RB_URL')}`],
                                queue: `${config.get('USER_QUEUE')}`,
                                queueOptions: {
                                    durable: true,
                                },
                            },
                        }
                    },
                    inject: [ConfigService],
                },
                {
                    name: 'MAP_SERVICE',
                    useFactory: (config: ConfigService) => {
                        return {
                            transport: Transport.RMQ,
                            options: {
                                urls: [`${config.get('MAP_RB_URL')}`],
                                queue: `${config.get('MAP_QUEUE')}`,
                                queueOptions: {
                                    durable: true,
                                },
                            },
                        }
                    },
                    inject: [ConfigService],
                },
            ],
        }),
        UserModule,
        CloudinaryModule,
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
        @Inject('LOG_SERVICE') private log: ClientProxy,
        @Inject('USER_SERVICE') private user: ClientProxy,
        @Inject('MAP_SERVICE') private map: ClientProxy,
    ) {}

    async onApplicationBootstrap() {
        await Promise.allSettled([
            this.log.connect(),
            this.user.connect(),
            this.map.connect(),
        ])
    }
}
