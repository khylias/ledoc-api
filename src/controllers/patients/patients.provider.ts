import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Patient } from './patient.interface';

import { v4 as uuidv4 } from 'uuid';
import { DictionariesProvider } from '../dictionaries/dictionaries.provider';

@Injectable()
export class PatientsProvider {
    patients: Patient[] = [
        {
            id: "1",
            firstName: "Jean",
            lastName: "Lavalanche",
            gender: 2,
            allergies: "Aucune",
            height: "192",
            weight: 77,
            lastIncome: "22/12/2020",
            lastSubject: "Toux sèche",
            bloodGroup: 4,
            socialNumber: "00555236698451",
            notes: "",
            documents: [
                {
                    name: "Ordonnance_22122020",
                    extension: "PDF",
                    uploadAt: "22/12/2020"
                }
            ],
            treatments: []
        },
        {
            id: "2",
            firstName: "Marine",
            lastName: "Gravol",
            gender: 1,
            allergies: "Aucune",
            height: "165",
            weight: 52,
            lastIncome: "04/01/2022",
            lastSubject: "Tendinite",
            bloodGroup: 8,
            socialNumber: "00369788462125",
            notes: "Suite efforts physiques importants, la patiente ressens des douleurs dans le bassin.",
            documents: [
                {
                    name: "radios_hopital_universitaire",
                    extension: "PNG",
                    uploadAt: "28/12/2021" 
                },
                {
                    name: "Arret_travail_temporaire",
                    extension: "PDF",
                    uploadAt: "04/01/2022"
                },
            ],
            treatments: [
                {
                    drug: 9,
                    repeat: [1,2,3],
                    duration: 6
                }
            ]
        },
        {
            id: "3",
            firstName: "Alexandre",
            lastName: "Falor",
            gender: 2,
            allergies: "Aucune",
            height: "188",
            weight: 82,
            lastIncome: "31/12/2021",
            lastSubject: "Luxation",
            bloodGroup: 3,
            socialNumber: "09876545677",
            notes: "",
            documents: [],
            treatments: []
        }
    ];

    constructor(private dictionariesProvider: DictionariesProvider) { }

    getPatients(query): Patient[] {
        if (!query.search) {
            return this.patients;
        }
        const search = query.search.toLowerCase();
        return this.patients.filter(patient => patient.firstName.toLowerCase().includes(search) || patient.lastName.toLowerCase().includes(search));
    }

    getPatient(id: string): Patient {
        return this.patients.find(patient => patient.id === id);
    }

    update(id: string, patient): Patient | Boolean {
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
        if (!this.dictionariesProvider.bloodgroups.find(group => group.id === data.bloodGroup)) {
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

    delete(id: string): boolean {
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
