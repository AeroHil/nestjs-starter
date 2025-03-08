import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Connection } from 'typeorm';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private connection: Connection,
    ) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('db-test')
    async testDb(): Promise<{ status: string; type: string }> {
        try {
            // Attempt a simple query
            await this.connection.query('SELECT 1');
            return {
                status: 'Database connection successful!',
                type: this.connection.options.type as string,
            };
        } catch (error) {
            return {
                status: `Database connection failed: ${error.message}`,
                type: this.connection.options.type as string,
            };
        }
    }
}