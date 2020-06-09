import { Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ApiCalendarService } from '../services/calendar.service';
import { EventEmitterService } from '../calendar/calendar.emitter.service';
import { Filters } from '../calendar/interfaces/calendar-filter-type';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  public listCategory: any = [];
  public listTag: any = [];
  public listVenue: any = [];
  public listOrganizer: any = [];
  public listWebsite: any = [];
  public listLocation: any = [];

  constructor(private apiService: ApiCalendarService, private eventEmitterService: EventEmitterService) {
    this.apiService.getFilters(Filters.CATEGORY).subscribe((data: any) => {
      const list = data?.data?.items;
      this.listCategory = list;
    });

    this.apiService.getFilters(Filters.TAG).subscribe((data: any) => {
      const list = data?.data?.items;
      this.listTag = list;
    });

    this.apiService.getFilters(Filters.VENUE).subscribe((data: any) => {
      const list = data?.data?.items;
      this.listVenue = list;
    });

    this.apiService.getFilters(Filters.ORGANIZER).subscribe((data: any) => {
      const list = data?.data?.items;
      this.listOrganizer = list;
    });

    this.apiService.getFilters(Filters.WEBSITE).subscribe((data: any) => {
      const list = data?.data?.items;
      this.listWebsite = list;
    });

    this.apiService.getFilters(Filters.LOCATION).subscribe((data: any) => {
      const list = data?.data?.items;
      this.listLocation = list;
    });

  }

  ngOnInit(): void {
  }

  applyFilters(): void {
    let params = "";
    params += this.concatParamToFilter("categories", this.collectCheckboxByClassName("filter_categories"));
    params += this.concatParamToFilter("tags", this.collectCheckboxByClassName("filter_tags"));
    params += this.concatParamToFilter("venues", this.collectCheckboxByClassName("filter_venues"));
    params += this.concatParamToFilter("organizers", this.collectCheckboxByClassName("filter_organizers"));

    let others1 = this.concatParamToFilter("filter_groups", this.collectCheckboxByClassName("filter_websites"));
    const others2 = this.collectCheckboxByClassName("filter_locations");
    if (others1.length > 0) {
      params += others1;
      if (others2.length > 0) {
        params += ",".concat(others2);
      }
    } else {
      params += this.concatParamToFilter("filter_groups", this.collectCheckboxByClassName("filter_locations"));
    }
    this.eventEmitterService.updateCalendar({ mode: 3, value: params });
  }

  resetFilters(): void {
    const result = document.getElementsByClassName("filter_elem");
    for (var pos = 0; pos < result.length; pos++) {
      const item: any = result[pos];
      item.checked = false;
    }
    this.applyFilters();
  }

  concatParamToFilter(paramName: string, data: string) {
    if (data && data.length > 0) {
      return "&".concat(paramName).concat("=").concat(data);
    }
    return "";
  }

  collectCheckboxByClassName(className: string): string {
    let list: string = "";
    const result = document.getElementsByClassName(className);
    for (var pos = 0; pos < result.length; pos++) {
      const item: any = result[pos];
      if (item.checked === true) {
        if (list.length > 0) list += ",";
        list += item.value;
      }
    }
    console.log("SELECTED ", className, list);
    return list;
  }
}
