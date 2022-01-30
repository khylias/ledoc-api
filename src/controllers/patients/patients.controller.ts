import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Patient } from './patient.interface';
import { PatientsProvider } from './patients.provider';

@Controller('patients')
export class PatientsController {

    constructor(private patientsProvider: PatientsProvider){}

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Patient, isArray: true, description: 'Array of patients' })
    @ApiQuery({ name: 'search', description: 'Recherche par prénom/nom' })
    getAll(@Query() query): Patient[] {
        return this.patientsProvider.getPatients(query);
    }

    @Get(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Patient, description: 'Get one Patient object' })
    getOne(@Param() params): Patient {
        return this.patientsProvider.getPatient(params.id);
    }

    @Post()
    @HttpCode(201)
    @ApiResponse({ status: 201, type: Patient, description: 'Create Patient' })
    create(@Body() patient: Patient): Patient {
        return this.patientsProvider.create(patient);
    }

    @Delete(':id')
    @HttpCode(200)
    delete(@Param() params): boolean {
        return this.patientsProvider.delete(params.id);
    }

    @Put(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Patient, description: 'Update Patient' })
    updateOne(@Param() params, @Body() payload: Patient) {
        return this.patientsProvider.update(params.id, payload);
    }
}
