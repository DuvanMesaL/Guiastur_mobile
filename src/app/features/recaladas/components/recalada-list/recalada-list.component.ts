import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';

@Component({
  selector: 'app-recaladas-list',
  template: `
    <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterPortCalls()"></ion-searchbar>

    <ion-list>
      <ion-item-sliding *ngFor="let portCall of filteredPortCalls">
        <ion-item>
          <ion-label>
            <h2>{{ portCall.buque }}</h2>
            <p>Puerto: {{ portCall.puerto }}</p>
            <p>Fecha: {{ portCall.fecha | date:'dd/MM/yyyy' }}</p>
          </ion-label>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option (click)="editPortCall(portCall)" color="primary">
            <ion-icon slot="icon-only" name="create"></ion-icon>
          </ion-item-option>
          <ion-item-option (click)="cancelPortCall(portCall)" color="danger">
            <ion-icon slot="icon-only" name="close-circle"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>

    <ion-fab vertical="bottom" horizontal="end" slot="fixed">
      <ion-fab-button (click)="openFilters()">
        <ion-icon name="options"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  `
})
export class RecaladasListComponent {
  portCalls = [
    { id: 1, buque: "Buque 1", puerto: "Puerto A", fecha: "2023-06-15" },
    { id: 2, buque: "Buque 2", puerto: "Puerto B", fecha: "2023-06-16" },
    { id: 3, buque: "Buque 3", puerto: "Puerto C", fecha: "2023-06-17" },
  ];

  filteredPortCalls = [...this.portCalls];
  searchTerm = '';
  filters = {
    buque: '',
    puerto: ''
  };

  constructor(
    private alertController: AlertController,
    private modalController: ModalController
  ) {}

  filterPortCalls() {
    this.filteredPortCalls = this.portCalls.filter(portCall =>
      (this.filters.buque === '' || portCall.buque === this.filters.buque) &&
      (this.filters.puerto === '' || portCall.puerto === this.filters.puerto) &&
      (portCall.buque.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       portCall.puerto.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  async editPortCall(portCall: any) {
    console.log('Edit port call', portCall);
    // Implement edit logic here
  }

  async cancelPortCall(portCall: any) {
    const alert = await this.alertController.create({
      header: 'Cancelar Recalada',
      message: '¿Está seguro de que desea cancelar esta recalada?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Sí',
          handler: () => {
            console.log('Cancelling port call', portCall);
            // Implement cancellation logic here
          }
        }
      ]
    });

    await alert.present();
  }

  async openFilters() {
    const modal = await this.modalController.create({
      component: FilterModalComponent,
      componentProps: {
        title: 'Filtrar Recaladas',
        filters: [
          {
            key: 'buque',
            label: 'Buque',
            options: [
              { value: 'Buque 1', label: 'Buque 1' },
              { value: 'Buque 2', label: 'Buque 2' },
              { value: 'Buque 3', label: 'Buque 3' }
            ]
          },
          {
            key: 'puerto',
            label: 'Puerto',
            options: [
              { value: 'Puerto A', label: 'Puerto A' },
              { value: 'Puerto B', label: 'Puerto B' },
              { value: 'Puerto C', label: 'Puerto C' }
            ]
          }
        ]
      }
    });

    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.filters = result.data;
        this.filterPortCalls();
      }
    });

    return await modal.present();
  }
}