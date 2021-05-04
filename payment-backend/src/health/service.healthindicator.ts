import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { AppService } from 'src/app.service';

@Injectable()
export class ServiceHealthIndicator extends HealthIndicator {
  constructor(private appService: AppService) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const isHealthy = this.appService.broken == false
    const result = this.getStatus(key, isHealthy, { broken: this.appService.broken });
    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Service check failed', result);
  }
}