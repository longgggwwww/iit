import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { TrimPipe } from './pipes/trim.pipe'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    const config = app.get(ConfigService)

    app.enableCors()

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transformOptions: {
                enableImplicitConversion: true,
            },
        }),
        new TrimPipe(),
    )

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [`${config.get('RB_URL')}`],
            queue: `${config.get('QUEUE')}`,
            queueOptions: {
                durable: true,
            },
        },
    })

    await app.startAllMicroservices()
    await app.listen(config.get('PORT', 3000))
}
bootstrap()
