import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseHealthService {
    constructor(private connection: Connection) {}

    async checkHealth(): Promise<{ status: string; type: string; isConnected: boolean }> {
        try {
            // Attempt a simple query to check connection
            await this.connection.query('SELECT 1');
            return {
                status: 'Database connection is healthy',
                type: this.connection.options.type as string,
                isConnected: true,
            };
        } catch (error) {
            return {
                status: `Database connection error: ${error.message}`,
                type: this.connection.options.type as string,
                isConnected: false,
            };
        }
    }
}