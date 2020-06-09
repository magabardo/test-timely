import { Component, OnInit, ɵConsole, Input } from '@angular/core';
import { DaysOfWeek } from './interfaces/days-of-week';
import { Calendar } from './interfaces/calendar';
import { setCalendar, buildCalendar, stringToDate } from './calendar-calc';
import { CalendarParams, ApiCalendarService } from '../services/calendar.service';
import { EventEmitterService } from './calendar.emitter.service';
import * as moment from 'moment';
import { CalendarUpdate, CalendarUpdateMode } from './interfaces/calendar-update';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  constructor(private apiService: ApiCalendarService, private eventEmitterService: EventEmitterService) { }

  daysOfWeek = DaysOfWeek;
  public calendar: Calendar;
  public selectedDate: string;
  public markDate: Date;
  public mom: any = moment;
  public currentDate: Date;
  public filters: string;

  ngOnInit(): void {
    this.switchDate(moment().toDate());

    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeCommentFunction.subscribe((param: CalendarUpdate) => {
        if (param.mode === CalendarUpdateMode.UPDATE_MONTH) {
          this.switchDate(moment(param.value.concat("-01"), "YYYY-MM").toDate());
        } else {
          if (param.mode === CalendarUpdateMode.UPDATE_DATE) {
            this.markDate = moment(param.value, "YYYY-MM-DD").toDate();
            this.switchDate(moment(param.value.substring(0, 8).concat("01"), "YYYY-MM-DD").toDate());
          } else {
            if (param.mode === CalendarUpdateMode.UPDATE_FILTER) {
              console.log("FILTER: ", param.value);
              this.filters = param.value;
              this.switchDate(this.currentDate);
            }
          }
        }
      });
    }
  }

  switchDate(date: Date) {
    this.currentDate = date;
    let calendarData = setCalendar(date, this.markDate);
    this.selectedDate = moment(calendarData.firstDayOfMonth).format("YYYY-MM-DD");
    let params: CalendarParams = {};
    params.firstDate = moment(calendarData.firstDayCalendar).format("YYYY-MM-DD");
    params.endDate = moment(calendarData.lastDayCalendar).format("YYYY-MM-DD");
    params.filter = this.filters;
    this.apiService.getCalendar(params).subscribe((data: any) => {
      const list = data?.data?.items;
      this.calendar = buildCalendar(calendarData, list);
    });
  }

  gotoAnchor(date: Date) {
    window.location.href = "#" + this.mom(date).format("YYYY-MM-DD");
  }
}
