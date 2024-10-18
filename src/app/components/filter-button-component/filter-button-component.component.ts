import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterModalComponent } from '../filter-modal/filter-modal.component';

@Component({
  selector: 'app-filter-button',
  template: `
    <ion-button (click)="openFilter()">
      <ion-icon slot="icon-only" name="filter"></ion-icon>
    </ion-button>
  `
})
export class FilterButtonComponent {
  @Input() filterOptions: string[] = [];
  @Output() filterChange = new EventEmitter<string>();

  constructor(private popoverController: PopoverController) {}

  async openFilter() {
    const popover = await this.popoverController.create({
      component: FilterModalComponent,
      componentProps: { filterOptions: this.filterOptions },
      translucent: true
    });

    await popover.present();

    const { data } = await popover.onDidDismiss();

    if (data) {
      this.filterChange.emit(data.selectedFilter);
    }
  }
}
