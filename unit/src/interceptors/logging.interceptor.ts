import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Response } from "express";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LogEvent } from "src/event/log.event";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(@Inject("LOG_SERVICE") private log: ClientProxy) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const { getRequest, getResponse } = ctx.switchToHttp();
    const { user, ip, method, path, headers, body } = getRequest();
    const { statusCode }: Response = getResponse();
    const now = Date.now();
    return next.handle().pipe(
      map(async (data) => {
        if (method !== "GET") {
          this.log.emit({ pattern: "log" }, <LogEvent>{
            entity: headers.entity,
            userId: user?.id,
            ip,
            method,
            statusCode,
            endPoint: path,
            body: JSON.stringify(body),
            time: `${Date.now() - now}ms`,
          });
        }
        return data;
      }),
      catchError((err) => {
        this.log.emit({ pattern: "log" }, <LogEvent>{
          entity: headers.entity,
          userId: user?.id,
          ip,
          method,
          statusCode: HttpStatus.NOT_ACCEPTABLE,
          endPoint: path,
          body,
          err,
          time: `${Date.now() - now}ms`,
        });
        return throwError(() => err);
      }),
    );
  }
}
