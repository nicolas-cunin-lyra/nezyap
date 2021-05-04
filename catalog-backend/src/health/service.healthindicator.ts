import { Injectable } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult, HealthCheckError } from '@nestjs/terminus';
import { AppService } from 'src/app.service';

@Injectable()
export class ServiceHealthIndicator extends HealthIndicator {
  constructor(private appService: AppService) {
    super()
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const catalog = this.appService.getAll()
    const isHealthy = catalog != null
    const result = this.getStatus(key, isHealthy, { catalog: null });
    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Service check failed', result);
  }
}