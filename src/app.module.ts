import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PatientsController } from './controllers/patients/patients.controller';
import { PatientsProvider } from './controllers/patients/patients.provider';

import { DictionariesController } from './controllers/dictionaries/dictionaries.controller';
import { DictionariesProvider } from './controllers/dictionaries/dictionaries.provider';

import { StatsController } from './controllers/stats/stats.controller';
import { StatsProvider } from './controllers/stats/stats.provider';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { MeetsController } from './controllers/meets/meets.controller';
import { MeetsProvider } from './controllers/meets/meets.provider';
import { VisitsController } from './controllers/visits/visits.controller';
import { VisitsProvider } from './controllers/visits/visits.provider';

@Module({
    imports: [AuthenticationModule, UsersModule],
    controllers: [AppController, PatientsController, DictionariesController, StatsController, MeetsController, VisitsController],
    providers: [AppService, PatientsProvider, DictionariesProvider, StatsProvider, MeetsProvider, VisitsProvider],
})
export class AppModule { }
