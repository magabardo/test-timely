import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Filters } from '../calendar/interfaces/calendar-filter-type';

export interface CalendarParams {
    firstDate?: string;
    endDate?: string;
    filter?: string;
}

@Injectable({
    providedIn: 'root'
})

export class ApiCalendarService {
    idCalendar: number = 4243455

    constructor(private httpClient: HttpClient) { }

    public getCalendar(params: CalendarParams) {
        let url = `https://timelyapp.time.ly/api/calendars/${this.idCalendar}/events?group_by_date=1`;
        if (params.firstDate)
            url += "&start_date=".concat(params.firstDate);
        if (params.endDate)
            url += "&end_date=".concat(params.endDate);
        if (params.filter)
            url += params.filter;
        return this.httpClient.get(url);
    }

    /*
    https://timelyapp.time.ly/api/calendars/4243455/events?categories=68717078&start_date=2020-06-08&per_page=8&page=1
    categories
    tags
    venues
    organizers
    filter_groups
    */

    public getFilters(param: Filters) {
        let url = `https://timelyapp.time.ly/api/calendars/${this.idCalendar}/taxonomies`;
        const paramFilter = param.valueOf();
        url = url.concat(paramFilter).concat("&per_page=1000&public=1");
        return this.httpClient.get(url);
    }
}

