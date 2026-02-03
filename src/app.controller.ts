import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

import { Public } from './auth/passport/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getRouts(): JSON {
    return this.appService.getRouts();
  }
}