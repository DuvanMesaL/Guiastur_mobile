import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  template: `
    <ion-list>
      <ion-radio-group (ionChange)="onFilterChange($event)">
        <ion-list-header>
          <ion-label>Selecciona un filtro</ion-label>
        </ion-list-header>

        <ion-item *ngFor="let option of filterOptions">
          <ion-label>{{ option }}</ion-label>
          <ion-radio slot="start" [value]="option"></ion-radio>
        </ion-item>
      </ion-radio-group>
    </ion-list>
  `
})
export class FilterModalComponent {
  @Input() filterOptions: string[] = [];
  @Output() filterChange = new EventEmitter<string>();

  constructor(private popoverController: PopoverController) {}

  onFilterChange(event: any) {
    const selectedFilter = event.detail.value;
    this.popoverController.dismiss({
      selectedFilter: selectedFilter
    });
  }
}
