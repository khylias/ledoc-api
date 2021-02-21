import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Dictionary } from './dictionaries.interface';
import { DictionariesProvider } from './dictionaries.provider';

@Controller('dictionaries')
export class DictionariesController {

    constructor(private dictionariesProvider: DictionariesProvider) {}

    @Get(':type')
    @ApiResponse({ status: 200, type: Dictionary, isArray: true, description: 'Array of dictionaries' })
    getDictionary(@Param() params): Dictionary[] {
        return this.dictionariesProvider.getDictionary(params.type);
    }
}
