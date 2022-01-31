import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { IndividualVisits, TourVisits, Visits } from './visits.interface';
import { VisitsProvider } from './visits.provider';

@Controller('visits')
export class VisitsController {
    constructor(private visitsProvider: VisitsProvider){}

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Visits, isArray: true, description: 'Array of Visits (Individual or Tour)'})
    @ApiQuery({name: 'types', isArray: true, description: 'Array of types should be return'})
    getAll(@Query() query): IndividualVisits[] | TourVisits[] {
        return this.visitsProvider.getVisits(query.types);
    }

    @Get(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Visits, description: 'Get one Visit object (Individual or Tour)' })
    getOne(@Param() params): IndividualVisits | TourVisits {
        return this.visitsProvider.getVisit(params.id);
    }

    @Post('/individual')
    @HttpCode(201)
    @ApiResponse({ status: 201, type: IndividualVisits, description: 'Create Individual visit' })
    createIndividual(@Body() visit: IndividualVisits): IndividualVisits {
        return this.visitsProvider.createIndividual(visit);
    }

    @Post('/tour')
    @HttpCode(201)
    @ApiResponse({ status: 201, type: TourVisits, description: 'Create Tour visit' })
    createTour(@Body() visit: TourVisits): TourVisits {
        return this.visitsProvider.createTour(visit);
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param() params): boolean {
        return this.visitsProvider.delete(params.id);
    }

    @Put('/individual/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, type: IndividualVisits, description: 'Update Individual Visit' })
    updateIOne(@Param() params, @Body() payload: IndividualVisits) {
        return this.visitsProvider.updateIndividual(params.id, payload);
    }

    @Put('/tour/:id')
    @HttpCode(200)
    @ApiResponse({ status: 200, type: TourVisits, description: 'Update Tour Visit' })
    updateTOne(@Param() params, @Body() payload: TourVisits) {
        return this.visitsProvider.updateTour(params.id, payload);
    }
}
