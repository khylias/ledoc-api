import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { Meet } from './meets.interface';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class MeetsProvider {

    meets: Meet[] = [
        {
            date: moment().add('1', 'h').format().toString(),
            subject: 'Consultation vidéo',
            patient: {
                id: uuidv4(),
                firstName: 'Jean-Richard',
                lastName: 'BRETOFORT'
            }
        },
        {
            date: moment().add('2', 'h').format().toString(),
            subject: 'Première consultation',
            patient: {
                id: uuidv4(),
                firstName: 'Boris',
                lastName: 'JONC'
            }
        },
        {
            date: moment().add('2', 'h').format().toString(),
            subject: 'Première consultation',
            patient: {
                id: uuidv4(),
                firstName: 'Boris',
                lastName: 'JONC'
            }
        }
    ];

    getMeets() {
        return this.meets;
    }
}
