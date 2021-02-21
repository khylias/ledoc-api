import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from './patient.interface';

import { v4 as uuidv4 } from 'uuid';
import { DictionariesProvider } from '../dictionaries/dictionaries.provider';

@Injectable()
export class PatientsProvider {
    patients: Patient[] = [];

    constructor(private dictionariesProvider: DictionariesProvider) {}

    getPatients(): Patient[] {
        return this.patients;
    }

    getPatient(id: string): Patient {
        return this.patients.find(patient => patient.id === id);
    }

    update(id: string, patient): Patient|Boolean {
        const index = this.patients.findIndex(patient => patient.id === id);
        if (index === -1) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id client inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        if (!this.dictionariesProvider.bloodgroups.find(group => group.id === patient.bloodGroup)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Bad Request',
                message: 'Groupe sanguin non valide.'
            }, HttpStatus.BAD_REQUEST);
        };

        let patientUpdated = { ...this.patients[index], ...patient };
        this.patients[index] = patientUpdated;
        return patientUpdated;
    }

    create(data): Patient {
        if (!this.dictionariesProvider.bloodgroups.find(group => group.id ===  data.bloodGroup)) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Bad Request',
                message: 'Groupe sanguin non valide.'
            }, HttpStatus.BAD_REQUEST);
        };
        const patient = { ...data, id: uuidv4() };
        this.patients.push(patient);
        return patient;
    }

    delete(id: string): Boolean {
        const index = this.patients.findIndex(client => client.id === id);
        if (index === -1) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Id client inconnu',
            }, HttpStatus.BAD_REQUEST);
        }

        this.patients.splice(index, 1);
        return true;
    }
}
