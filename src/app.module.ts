import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PatientsController } from './controllers/patients/patients.controller';
import { PatientsProvider } from './controllers/patients/patients.provider';

import { DictionariesController } from './controllers/dictionaries/dictionaries.controller';
import { DictionariesProvider } from './controllers/dictionaries/dictionaries.provider';

import { StatsController } from './controllers/stats/stats.controller';
import { StatsProvider } from './controllers/stats/stats.provider';

@Module({
  imports: [],
  controllers: [AppController, PatientsController, DictionariesController, StatsController],
    providers: [AppService, PatientsProvider, DictionariesProvider, StatsProvider],
})
export class AppModule {}
