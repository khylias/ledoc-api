import { Controller, Get, HttpCode, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Stat } from './stat.interface';

@Controller('stats')
export class StatsController {

    stats = {
        day: {
            meeting: 7,
            emergencies: 0,
            videoMeeting: 8,
            availablesAssits: 2,
            orders: 4,
            missingCalls: 14
        },
        week: {
            meeting: 38,
            emergencies: 8,
            videoMeeting: 10,
            availablesAssits: 4,
            orders: 13,
            missingCalls: 46
        },
        month: {
            meeting: 55,
            emergencies: 10,
            videoMeeting: 23,
            availablesAssits: 4,
            orders: 44,
            missingCalls: 138
        }
    }
    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Stat, description: 'Stats' })
    @ApiQuery({ name: 'period', required: false, enum: ['day', 'week', 'month'] })
    getStats(@Query() query) {
        if ( query.period && !this.stats[query.period]) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Période inconnue. Les valeurs autorisées sont : day, week, month',
            }, HttpStatus.BAD_REQUEST);
        }
        return query.period ? this.stats[query.period] : this.stats.day;
    }
}
