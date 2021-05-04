import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';
import { AppService } from 'src/app.service';
import { ServiceHealthIndicator } from './service.healthindicator';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private appService: AppService,
    private serviceHealthIndicator: ServiceHealthIndicator,
  ) {}

  @Get('')
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.serviceHealthIndicator.isHealthy('service'),
    ]);
  }

  //
  // To simulate breaking health
  //
  @Get('/break')
  breakIt(): void {
    return this.appService.breakIt()
  }

  @Get('/fix')
  fixIt(): void {
    return this.appService.fixIt()
  }
}
