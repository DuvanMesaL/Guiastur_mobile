import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter-modal',
  template: './filter-modal.component.html'
})
export class FilterModalComponent {
  @Input() title: string = 'Filtrar';
  @Input() filters: Array<{key: string, label: string, options: Array<{value: string, label: string}>}> = [];
  @Output() filtersApplied = new EventEmitter<any>();

  filterValues: {[key: string]: string} = {};

  constructor(private modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }

  applyFilters() {
    this.filtersApplied.emit(this.filterValues);
    this.modalController.dismiss(this.filterValues);
  }
}