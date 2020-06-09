import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { ApiCalendarService } from '../services/calendar.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EventEmitterService } from './calendar.emitter.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let service: ApiCalendarService;
  let fixture: ComponentFixture<CalendarComponent>;
  let apiCalendarService: ApiCalendarService;
  let eventEmitterService: EventEmitterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarComponent],
      providers: [ApiCalendarService, EventEmitterService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiCalendarService = TestBed.get(ApiCalendarService);
    eventEmitterService = TestBed.get(EventEmitterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
