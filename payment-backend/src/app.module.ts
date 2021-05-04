import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { PrometheusModule } from "@willsoto/nestjs-prometheus";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthController } from './health/health.controller';
import { ServiceHealthIndicator } from './health/service.healthindicator';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    TerminusModule,
    PrometheusModule.register(),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, ServiceHealthIndicator],
})
export class AppModule {}
