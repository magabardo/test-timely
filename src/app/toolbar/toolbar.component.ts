import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import { EventEmitterService } from '../calendar/calendar.emitter.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'calendar-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private eventEmitterService: EventEmitterService) { }
  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>>;

  @Input('selected-date') selectedDate: Date;
  @Input('first-day') firstDay: Date;
  @Input('last-day') lastDay: Date;

  public currentDate: Date;
  public titleDate: string;
  public shortTitleDate: string;

  ngOnInit(): void {
    this.setDate(this.selectedDate, false);
  }

  onClickPrevious(): void {
    this.setDate(moment(this.currentDate).add(-1, 'month').toDate(), true);
  }

  onClickNext(): void {
    this.setDate(moment(this.currentDate).add(1, 'month').toDate(), true);
  }

  onClickGotoToday(): void {
    this.setDate(moment().toDate(), true);
  }

  setDate(date: Date, update: boolean): void {
    this.currentDate = date;
    this.titleDate = moment(this.currentDate).format("MMMM of YYYY");
    this.shortTitleDate = moment(this.currentDate).format("MM/YYYY");
    if (update)
      this.eventEmitterService.updateCalendar({ mode: 1, value: moment(date).format("YYYY-MM") });
  }

  changeDateCalendar() {
    let dtSelected: any = document.getElementById("selectedDtInput");
    dtSelected = dtSelected.value;
    dtSelected = moment(dtSelected, "M/D/YYYY")
    this.setDate(dtSelected.toDate(), false);
    this.eventEmitterService.updateCalendar({ mode: 2, value: dtSelected.format("YYYY-MM-DD") });
  }
}
