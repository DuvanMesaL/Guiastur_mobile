import { Component, OnInit } from '@angular/core';
import { GetbuqueService } from '../../services/getService/getbuque.service';
import { AlertController } from '@ionic/angular';

interface Buque {
  id: number;
  codigo: string;
  nombre: string;
  recaladas: number;
  atenciones: number;
}

@Component({
  selector: 'app-buque-list',
  template: `
    <ion-searchbar [(ngModel)]="searchTerm" (ionInput)="filterShips()"></ion-searchbar>

    <ion-list>
      <ion-item-sliding *ngFor="let ship of filteredShips">
        <ion-item>
          <ion-label>
            <h2>{{ ship.nombre }}</h2>
            <p>Código: {{ ship.codigo }}</p>
            <p>Recaladas: {{ ship.recaladas }}</p>
            <p>Atenciones: {{ ship.atenciones }}</p>
            <ion-badge color="primary">{{ ship.codigo }}</ion-badge>
          </ion-label>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option (click)="editShip(ship)" color="primary">
            <ion-icon slot="icon-only" name="create"></ion-icon>
          </ion-item-option>
          <ion-item-option (click)="showDetails(ship)" color="secondary">
            <ion-icon slot="icon-only" name="information-circle"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `
})
export class BuqueListComponent implements OnInit {
  ships: Buque[] = [];
  filteredShips: Buque[] = [];
  searchTerm = '';

  constructor(
    private getBuqueService: GetbuqueService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.loadShips();
  }

  loadShips() {
    this.getBuqueService.getBuques().subscribe(
      (response) => {
        if (response.status === 'success' && Array.isArray(response.data)) {
          this.ships = response.data;
          this.filteredShips = [...this.ships];
        } else {
          console.error('La API no devolvió un array en "data"');
        }
      },
      (error) => {
        console.error('Error al obtener los buques:', error);
      }
    );
  }

  filterShips() {
    this.filteredShips = this.ships.filter(ship =>
      ship.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ship.codigo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async editShip(ship: Buque) {
    console.log('Editar buque', ship);
  }

  async showDetails(ship: Buque) {
    const alert = await this.alertController.create({
      header: 'Detalles del Buque',
      message: `
        <strong>Nombre:</strong> ${ship.nombre}<br>
        <strong>Código:</strong> ${ship.codigo}<br>
        <strong>Recaladas:</strong> ${ship.recaladas}<br>
        <strong>Atenciones:</strong> ${ship.atenciones}
      `,
      buttons: ['Cerrar']
    });

    await alert.present();
  }
}
