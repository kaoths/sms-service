import { Injectable, NestMiddleware, ServiceUnavailableException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ServiceEnableMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (process.env.SERVICE_ENABLE !== 'true') {
      throw new ServiceUnavailableException({
        statusCode: 503,
        error: 'Services are disabled',
      });
    }
    next();
  }
}
