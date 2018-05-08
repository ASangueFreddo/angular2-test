import { Injectable } from '@angular/core';
import { IPerson } from '../models/person';

@Injectable()
export class PersonlistService {
    public getListPerson(): IPerson[] {
        return [
            {
                "ID": 0,
                "name": "Giorgio",
                "surname": "Masci",
                "birthDate": new Date("1992,10,28")
            },
            {
                "ID": 1,
                "name": "Giovanni",
                "surname": "Rossi",
                "birthDate": new Date("2018,11,24")
            },
            {
                "ID": 2,
                "name": "Mario",
                "surname": "Capatonda",
                "birthDate": new Date("2015,07,15")
            },
            {
                "ID": 3,
                "name": "Francesco",
                "surname": "Bottarga",
                "birthDate": new Date("2016,01,21")
            }
        ]
    }
}