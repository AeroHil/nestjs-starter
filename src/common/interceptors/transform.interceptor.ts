import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  meta?: Record<string, any>;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        // Check if the data already has a specific structure
        if (data && data.hasOwnProperty('data') && data.hasOwnProperty('meta')) {
          return data;
        }

        // Format the response
        return {
          data,
          meta: {
            timestamp: new Date().toISOString(),
          },
        };
      }),
    );
  }
}
