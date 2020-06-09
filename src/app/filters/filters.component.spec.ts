import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FiltersComponent } from './filters.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ApiCalendarService } from '../services/calendar.service';
import { EventEmitterService } from '../calendar/calendar.emitter.service';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  let apiCalendarService: ApiCalendarService;
  let eventEmitterService: EventEmitterService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      providers: [ApiCalendarService, EventEmitterService],
      imports: [HttpClientTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    apiCalendarService = TestBed.get(ApiCalendarService);
    eventEmitterService = TestBed.get(EventEmitterService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
