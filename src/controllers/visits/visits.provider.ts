import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IndividualVisits, TourVisits } from './visits.interface';

import { v4 as uuidv4 } from 'uuid';
import { PatientsProvider } from '../patients/patients.provider';

@Injectable()
export class VisitsProvider {
    visits: any[] = [
        {
            id: uuidv4(),
            type: 'individual',
            patient: '1',
            date: '2022-03-02',
            startTime: '10:30',
            subject: 'Consultation à domicile',
        },
        {
            id: '3',
            type: 'individual',
            patient: '2',
            date: '2022-03-02',
            startTime: '10:30',
            subject: 'Vaccination',
        },
        {
            id: '2',
            type: 'individual',
            patient: '3',
            date: '2022-03-02',
            startTime: '11:30',
            subject: 'Consultation post-opératoire',
        },
        {
            id: uuidv4(),
            title: 'Route de Rochefort',
            type: 'tour',
            startTime: '09:30',
            individuals: ['2', '3'],
        }
    ];

    constructor(private patientProvider: PatientsProvider){}

    getVisits(query): IndividualVisits[] | TourVisits[] {
        const visits = !!query ? this.visits.filter(visit => query.includes(visit.type)) : this.visits;
        return visits.map(visit => this.getVisit(visit.id));
    }

    getVisit(id: string): IndividualVisits | TourVisits {
        const visit = {...this.visits.find(visit => visit.id === id)};
        if(visit.type === 'individual') visit.patient = this.patientProvider.getPatient(visit.patient);
        if(visit.type === 'tour') {
            visit.individuals = visit.individuals.map(individualVisit =>  {
                return this.getVisit(individualVisit);
            });
        }
        return visit;
    }

    createIndividual(data): IndividualVisits {
        if (!this.patientProvider.getPatient(data.patient)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id patient inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        if(!!data.tour && !this.visits.find(visit => visit.id === data.tour)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id de tournée inconnu',
            }, HttpStatus.BAD_REQUEST);
        }
        const visit = { ...data, id: uuidv4()};
        this.visits.push(visit);
        return visit;
    }

    createTour(data): TourVisits {
        if(!data.patients.every(patient => !!this.patientProvider.getPatient(patient))) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Un ID patient n\'est pas reconnu',
            }, HttpStatus.BAD_REQUEST);
        }
        const visit = { ...data, id: uuidv4() };
        this.visits.push(visit);
        
        return visit;
    }

    delete(id: string): boolean {
        const index = this.visits.findIndex(visit => visit.id === id);
        if (index === -1) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id visit inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        this.visits.splice(index, 1);
        return true;
    }

    updateIndividual(id: string, visit): IndividualVisits | boolean {
        const index = this.visits.findIndex(visit => visit.id === id);
        if (index === -1) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id visite inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        if (!this.patientProvider.getPatient(visit.patient)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id patient inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        if (!!visit.tour && !this.visits.find(visit => visit.id === visit.tour)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id de tournée inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        const visitUpdated = { ...this.visits[index], ...visit };
        this.visits[index] = visitUpdated;
        return visitUpdated;
    }

    updateTour(id: string, visit): TourVisits | boolean {
        const index = this.visits.findIndex(visit => visit.id === id);
        if (index === -1) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id visite inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        if (!visit.patients.every(patient => !!this.patientProvider.getPatient(patient))) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Un ID patient n\'est pas reconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        const visitUpdated = { ...this.visits[index], ...visit };
        this.visits[index] = visitUpdated;
        return visitUpdated;
    }
}
