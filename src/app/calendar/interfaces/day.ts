import { Moment } from 'moment';

export interface Day {
    date: Date;
    weekday: number;
    day: number,
    month: number,
    year: number,
    today?:boolean,
    anotherMonth?: boolean,
    schedule?: Array<any>
}