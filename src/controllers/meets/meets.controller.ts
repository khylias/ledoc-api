import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Meet } from './meets.interface';
import { MeetsProvider } from './meets.provider';

@Controller('meets')
export class MeetsController {

    constructor(private meetsProvider: MeetsProvider) {}

    @Get()
    @HttpCode(200)
    @ApiResponse({ status: 200, type: Meet, isArray: true, description: 'Array of Meets' })
    getAll() {
        return this.meetsProvider.getMeets();
    }
}
