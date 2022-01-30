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
            subject: 'Consultation à domicile',
        },
        {
            id: uuidv4(),
            title: '',
            type: 'tour',
            startTime: '09:30',
            patients: ['2', '3'],
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
            visit.patients = visit.patients.map(patient => this.patientProvider.getPatient(patient));
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
}
