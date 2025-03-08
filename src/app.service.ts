import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Welcome to NestJS API! Try /db-test to check database connection.';
    }
}