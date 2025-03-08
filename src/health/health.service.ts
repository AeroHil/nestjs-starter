import { Injectable } from '@nestjs/common';
import { DatabaseHealthService } from '../common/services/database-health.service';

@Injectable()
export class HealthService {
  constructor(private databaseHealthService: DatabaseHealthService) {}

  async check() {
    const dbHealth = await this.databaseHealthService.checkHealth();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        database: dbHealth,
        api: {
          status: 'API is operational',
          isConnected: true,
        },
      },
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
