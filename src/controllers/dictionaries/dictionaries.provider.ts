import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Dictionary } from './dictionaries.interface';

@Injectable()
export class DictionariesProvider {
    drugs: Dictionary[] = [
        {
            id: 1,
            label: 'Paracetamol'
        },
        {
            id: 2,
            label: 'Efferalgan'
        },
        {
            id: 3,
            label: 'Levothyrox'
        },
        {
            id: 4,
            label: 'Spasfon'
        },
        {
            id: 5,
            label: 'Magne B6'
        },
        {
            id: 6,
            label: 'Gaviscon'
        },
        {
            id: 7,
            label: 'Mopral'
        },
        {
            id: 8,
            label: 'Toplexil'
        },
        {
            id: 9,
            label: 'Xanax'
        }
    ]; 

    repeats: Dictionary[] = [
        {
           id: 1,
           label: 'Matin'
        },
        {
            id: 2,
            label: 'Midi'
        },
        {
            id: 3,
            label: 'Soir'
        },
    ];

    gender: Dictionary[] = [
        {
            id: 1,
            label: 'Femme'
        },
        {
            id: 2,
            label: 'Homme'
        },
        {
            id: 3,
            label: 'Non renseigné'
        },
    ];

    periods: Dictionary[] = [
        {
            id: 1,
            label: '1 jour'
        },
        {
            id: 2,
            label: '2 jours'
        },
        {
            id: 3,
            label: '3 jours'
        },
        {
            id: 4,
            label: '1 semaine'
        },
        {
            id: 5,
            label: '2 semaines'
        },
        {
            id: 6,
            label: '3 semaines'
        },
    ];

    bloodgroups: Dictionary[] = [
        {
            id: 1,
            label: 'A+'
        },
        {
            id: 2,
            label: 'A-'
        },
        {
            id: 3,
            label: 'B+'
        },
        {
            id: 4,
            label: 'B-'
        },
        {
            id: 5,
            label: 'AB+'
        },
        {
            id: 6,
            label: 'AB-'
        },
        {
            id: 7,
            label: 'O+'
        },
        {
            id: 8,
            label: 'O-'
        }
    ];

    getDictionary(type): Dictionary[] {
        if(!this[type]) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Dictionnaire inconnu. Les valeurs autorisées sont : drugs, repeats, periods, bloodgroups, gender',
            }, HttpStatus.BAD_REQUEST);
        }
        return this[type];
    }

}
