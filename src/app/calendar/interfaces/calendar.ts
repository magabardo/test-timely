import { Moment } from 'moment';
import { Week } from './week';

export interface Calendar {
    today: Date;
    month: number;
    year: number;
    firstDayOfMonth: Date;
    firstDayCalendar: Date,
    lastDayCalendar: Date,
    markDate?: Moment,
    weeks?: Array<Week>;
}