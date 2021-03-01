import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Patient } from './patient.interface';
import { PatientsProvider } from './patients.provider';

@Controller('patients')
export class PatientsController {

    constructor(private patientsProvider: PatientsProvider){}

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Patient, isArray: true, description: 'Array of patients' })
    getAll(): Patient[] {
        return this.patientsProvider.getPatients();
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
    delete(@Param() params): Boolean {
        return this.patientsProvider.delete(params.id);
    }

    @Put(':id')
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Patient, description: 'Update Patient' })
    updateOne(@Param() params, @Body() payload: Patient) {
        return this.patientsProvider.update(params.id, payload);
    }
}
