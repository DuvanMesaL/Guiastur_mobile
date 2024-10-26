import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  @Input() filters: any[] = [];
  @Output() filterApplied = new EventEmitter<any>();

  applyFilter() {
    const filterData = this.filters.reduce((acc, filter) => {
      acc[filter.key] = filter.value;
      return acc;
    }, {});

    this.filterApplied.emit(filterData);
  }
}
