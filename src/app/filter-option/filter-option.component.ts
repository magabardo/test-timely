import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss']
})
export class FilterOptionComponent implements OnInit {
  @Input() title: String;
  @Input() data;
  @Input() type;

  constructor() { }

  ngOnInit(): void { }

  resetFilters(): void {
    const result = document.getElementsByClassName("filter_".concat(this.title.toLowerCase().trim()));
    for (var pos = 0; pos < result.length; pos++) {
      const item: any = result[pos];
      item.checked = false;
    }
  }
}
