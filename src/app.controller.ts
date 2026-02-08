import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { Public } from './auth/passport/decorators/public.decorator';
import { RouteDefinition } from './constants/types/routeDefinition.type';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getAllRoutes(): RouteDefinition[] {
    return this.appService.getAllRoutes();
  }
}
