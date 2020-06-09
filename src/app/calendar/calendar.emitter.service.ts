import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { CalendarUpdate } from './interfaces/calendar-update';

@Injectable({
    providedIn: 'root'
})
export class EventEmitterService {
    invokeCommentFunction = new EventEmitter();
    subsVar: Subscription;
    constructor() { }

    updateCalendar(value: CalendarUpdate) {
        this.invokeCommentFunction.emit(value);
    }
}
