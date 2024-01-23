export type UploadAvtEventDto = {
    userId: number
    imageUrl: string
}

export class UploadAvtEvent {
    private readonly id: number
    private readonly url: string

    constructor({ userId, imageUrl }: UploadAvtEventDto) {
        this.id = userId
        this.url = imageUrl
    }
}
