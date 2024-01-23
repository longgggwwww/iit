export type LogEventDto = {
    entity: string
    userId: number
    ip?: string
    method: string
    statusCode: number
    endPoint: string
    body?: string
    time: string
    error?: string
}

export class LogEvent {
    private readonly entity: string
    private readonly userId: number
    private readonly ip?: string
    private readonly method: string
    private readonly endPoint: string
    private readonly body?: string
    private readonly statusCode: number
    private readonly time: string
    private readonly error?: string

    constructor({
        entity,
        userId,
        ip,
        method,
        statusCode,
        endPoint,
        body,
        time,
        error,
    }: LogEventDto) {
        this.entity = entity
        this.userId = userId
        this.ip = ip
        this.method = method
        this.statusCode = statusCode
        this.endPoint = endPoint
        this.body = body
        this.time = time
        this.error = error
    }
}
