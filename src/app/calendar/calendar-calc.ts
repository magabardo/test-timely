import { Calendar } from './interfaces/calendar'
import * as moment from 'moment';
import { Day } from './interfaces/day';
import { Week } from './interfaces/week';
import { DaysOfWeek } from './interfaces/days-of-week';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';

const DEFAULT_FORMAT: string = "YYYY-MM-DD";

export const stringToDate = (strDate: string): moment.Moment => {
    if (strDate === null) return moment();
    const date = moment(strDate, "MM-DD-YYYY");
    return date;
}

export const beaultyDate = (date: moment.Moment): String => {
    return "";
}

const getToday = (): moment.Moment => {
    return moment(moment().format(DEFAULT_FORMAT), DEFAULT_FORMAT);
}

const getFirstDayOfMonth = (month: number, year: number): Date => {
    const str = moment([year, month, 1]);
    return moment(str, DEFAULT_FORMAT).toDate();
}

const getLastDayOfMonth = (month: number, year: number): Date => {
    const firstDate = moment(getFirstDayOfMonth(month, year));
    return moment([year, month, firstDate.daysInMonth()]).toDate();
}

const getFirstDayOfCalendar = (month: number, year: number): Date => {
    const firstDate = moment([year, month, 1]);
    const str = firstDate.add(-1 * firstDate.weekday(), 'days');
    return moment(str, DEFAULT_FORMAT).toDate();
}

const getLastDayOfCalendar = (month: number, year: number): Date => {
    const lastDate = moment(getLastDayOfMonth(month, year));
    const subtract = (6 - lastDate.weekday());
    const str = lastDate.add(subtract, 'days');
    return moment(str, DEFAULT_FORMAT).toDate();
}

const formatDate = (date: Date): string => {
    return moment(date).format("YYYY-MM-DD");
}

export const setCalendar = (dateParam: Date, markDate: Date): Calendar => {
    const today = getToday();
    const newDate = (dateParam === null) ? today : dateParam;
    const month = moment(newDate).month();
    const year = moment(newDate).year();
    const firstDayOfMonth = getFirstDayOfMonth(month, year);
    const lastDayOfMonth = getLastDayOfMonth(month, year);
    const firstDayOfCalendar = getFirstDayOfCalendar(month, year);
    const lastDayOfCalendar = getLastDayOfCalendar(month, year);
    let calendar: Calendar = {
        today: today.toDate(),
        firstDayCalendar: firstDayOfCalendar,
        lastDayCalendar: lastDayOfCalendar,
        firstDayOfMonth: firstDayOfMonth,
        month: month,
        year: year,
        markDate: moment(markDate),
        weeks: []
    };
    return calendar;
}

export const buildCalendar = (dateParam: Calendar, data: any): Calendar => {
    let date = moment(dateParam.firstDayCalendar);
    let weekNumber = 1;
    let week: Week;
    let days: Array<Day>;
    let weeks: Array<Week> = [];
    while (date.isSameOrBefore(moment(dateParam.lastDayCalendar))) {
        const weekDayCurrent = date.weekday();
        if (weekDayCurrent === 0) {
            days = [];
            week = {
                "weekNumber": weekNumber,
                "days": []
            };
        }

        const newPosition = days.length;
        days[newPosition] = {
            date: date.toDate(),
            weekday: date.weekday(),
            day: date.date(),
            month: date.month(),
            year: date.year(),
        };

        let getData = data[date.format("YYYY-MM-DD")];
        if (getData !== undefined) {
            days[newPosition].schedule = getData;
        }

        if (date.isSame(dateParam.today)) {
            days[newPosition].today = true;
        }

        if (date.month() !== dateParam.month) {
            days[newPosition].anotherMonth = true;
        }

        if (weekDayCurrent === 6) {
            week.days = days;
            weeks[weeks.length] = week;
        }

        date = date.add(1, 'days');
        if (date.weekday() === 0) {
            weekNumber++;
        }
    }

    let calendar: Calendar = dateParam;
    calendar.weeks = weeks;
    return calendar;
}