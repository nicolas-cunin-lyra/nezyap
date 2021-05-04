import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { ServiceHealthIndicator } from './health/service.healthindicator';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";

@Module({
  imports: [
    TerminusModule,
    PrometheusModule.register(),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, ServiceHealthIndicator],
})
export class AppModule {}
