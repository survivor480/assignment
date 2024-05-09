import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpException, SetMetadata } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ApiResponse<T> {
    status: string;
    statusMessage: string;
    statusCode: number;
    data: T;
}

export class FinalResponse{
    constructor(public resp: any, public status:string = "Success", public statusCode:number = 400, public message:string = ''){
        if(status === 'failed'){
            throw new HttpException(message, statusCode || 400);
        }
    }
}  

@Injectable()
export class ResponseWrapperInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
        console.log("This is being executed");

        return next.handle().pipe(
            map((data: FinalResponse) => ({
                status: data.status,
                statusMessage: data.message,
                statusCode: data.statusCode,
                data: data.resp,
            }))
        );
    }
}