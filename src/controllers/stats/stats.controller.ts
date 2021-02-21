import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('stats')
export class StatsController {

    @Get()
    @HttpCode(200)
    getStats() {
        return {
            meeting: 7,
            emergencies: 0,
            videoMeeting: 8,
            availablesAssits: 2,
            orders: 4,
            missingCalls: 14
        }
    }
}
