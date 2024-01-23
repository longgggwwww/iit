import { Injectable } from '@nestjs/common'
import {
    ConfigAndUrlOptions,
    TransformationOptions,
    v2 as cloudinary,
} from 'cloudinary'
import * as streamifier from 'streamifier'
import { CloudinaryResponse } from './response'

@Injectable()
export class CloudinaryService {
    uploadFile(
        file: Express.Multer.File,
        path?: string,
    ): Promise<CloudinaryResponse> {
        return new Promise<CloudinaryResponse>((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                path ? { folder: path } : {},
                (err, res) => {
                    if (err) {
                        return reject(err)
                    }

                    resolve(res)
                },
            )
            streamifier.createReadStream(file.buffer).pipe(uploadStream)
        })
    }

    make(url: string, opts: TransformationOptions | ConfigAndUrlOptions) {
        return cloudinary.url(url, opts)
    }
}
