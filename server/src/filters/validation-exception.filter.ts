import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse() as
      | string
      | { message: string | ValidationError[] };

    const validationErrors =
      typeof exceptionResponse === 'object' &&
      Array.isArray(exceptionResponse.message)
        ? exceptionResponse.message
        : [];

    const formattedErrors = validationErrors.map((error: ValidationError) => ({
      field: error.property,
      errors: Object.values(error.constraints || {}),
    }));

    response.status(status).json({
      statusCode: status,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }
}
