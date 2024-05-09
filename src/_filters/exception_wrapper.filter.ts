import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ExceptionWrapperFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = 500; // Default to internal server error status
    let errorDescriptions:string[];

    console.log(exception);

    if (exception instanceof HttpException) {
      status = exception.getStatus ? exception.getStatus() : 500; // Use getStatus() if available
      const exceptionResponse:any = exception.getResponse();
      errorDescriptions = exceptionResponse?.message;
    }

    response
      .status(status)
      .json({
        status: false,
        statusMessage: exception.message,
        statusCode: status,
        data: errorDescriptions,
      });
  }
}