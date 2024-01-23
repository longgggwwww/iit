import {
    Controller,
    Inject,
    Injectable,
    Post,
    Scope,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { FileInterceptor } from '@nestjs/platform-express'
import { UserService } from './user.service'

@Injectable({ scope: Scope.REQUEST })
@Controller('users')
export class UserController {
    constructor(
        private user: UserService,
        @Inject(REQUEST) private req: any,
    ) {
        if (req.headers) {
            req.headers.entity = 'user'
        }
    }

    @Post('avatar')
    @UseInterceptors(FileInterceptor('photo'))
    uploadAvatar(@UploadedFile() file: Express.Multer.File) {
        return this.user.uploadAvatar(file, this.req.user?.id)
    }
}
