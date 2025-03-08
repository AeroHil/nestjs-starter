import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';
import { DatabaseHealthService } from '../common/services/database-health.service';

@Module({
  controllers: [HealthController],
  providers: [HealthService, DatabaseHealthService],
})
export class HealthModule {}
