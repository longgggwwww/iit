import { Module } from '@nestjs/common'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
    controllers: [UserController],
    providers: [UserService, CloudinaryService],
})
export class UserModule {}
