import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger("BasicPasswordMiddleware");
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    // if(req.method !== "GET" && req.headers.token !== this.configService.get("TOKEN")) {
    if(req.headers.token !== this.configService.get("TOKEN")) {
      this.logger.error(`[Error] Invalid token: "${req.headers.token}"`);
      return res.status(401).json({ Error: "Invalid token" });
    }
    next();
  }
}