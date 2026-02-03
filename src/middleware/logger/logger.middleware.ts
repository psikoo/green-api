import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const logger: Logger = new Logger(req.method);
  logger.log(`[${req.ip}] "${req.originalUrl}": ${JSON.stringify(req.body)} (${req.headers["user-agent"]})`);
  next();
}