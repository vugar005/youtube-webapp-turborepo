import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/manual_warmup')
  async manualWarmUp(): Promise<any> {
    return {
      ok: true,
    };
  }
}
