import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor() {}

  filterData(items: any[], searchTerm: string, keys: string[]): any[] {
    if (!searchTerm) {
      return items;
    }

    return items.filter(item =>
      keys.some(key =>
        item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  filterBySpecificField(items: any[], selectedFilter: string, key: string): any[] {
    if (selectedFilter === 'Todos' || !selectedFilter) {
      return items;
    }

    return items.filter(item => item[key] === selectedFilter);
  }
}
