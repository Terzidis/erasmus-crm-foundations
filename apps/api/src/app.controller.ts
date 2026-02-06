import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Get('info')
  info() {
    return {
      name: 'Erasmus CRM API',
      phase: 'Phase 1',
      status: 'running',
    };
  }
}
