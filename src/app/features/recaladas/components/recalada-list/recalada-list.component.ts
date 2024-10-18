import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GetrecaladaService } from '../../services/getServices/getrecalada.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-recaladas-list',
  template: `
    <ion-toolbar>
      <ion-title>Lista de Recaladas</ion-title>
      <ion-buttons slot="end">
        <app-filter-button
          [filterOptions]="filterOptions"
          (filterChange)="onFilterChange($event)">
        </app-filter-button>
      </ion-buttons>
    </ion-toolbar>

    <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterPortCalls()"></ion-searchbar>

    <ion-list>
      <ion-item-sliding *ngFor="let portCall of filteredPortCalls">
        <ion-item>
          <ion-label>
            <h2>{{ portCall.buque_nombre }}</h2>
            <p>País: {{ portCall.pais_nombre }}</p>
            <p>Fecha de Arribo: {{ portCall.fecha_arribo.date | date:'dd/MM/yyyy' }}</p>
            <p>Fecha de Zarpe: {{ portCall.fecha_zarpe.date | date:'dd/MM/yyyy' }}</p>
            <p>Total de Turistas: {{ portCall.total_turistas }}</p>
            <p>Número de Atenciones: {{ portCall.numero_atenciones }}</p>
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

    <ion-spinner *ngIf="loading"></ion-spinner>
    <p *ngIf="errorMessage" class="error-message">{{ errorMessage }}</p>
  `
})
export class RecaladasListComponent implements OnInit {
  portCalls: any[] = [];
  filteredPortCalls: any[] = [];
  searchTerm = '';
  filterOptions = ['Todos'];
  loading = false;
  errorMessage = '';

  constructor(
    private alertController: AlertController,
    private getRecaladaService: GetrecaladaService
  ) {}

  ngOnInit() {
    console.log('ngOnInit se ha llamado');
    this.loadRecaladas();
  }

  loadRecaladas() {
    this.loading = true;
    console.log('Cargando recaladas...');

    this.getRecaladaService.getRecaladas()
      .pipe(
        catchError((error) => {
          console.error('Error en la solicitud de recaladas:', error);
          this.errorMessage = 'Ocurrió un error al obtener las recaladas.';
          this.loading = false;
          return of([]);
        })
      )
      .subscribe((response) => {
        console.log('Recaladas obtenidas:', response);

        if (response && response.status === 'success' && Array.isArray(response.data.recaladas)) {
          this.portCalls = response.data.recaladas;
          this.filteredPortCalls = [...this.portCalls];
          this.filterOptions = ['Todos', ...this.getUniqueBuquesAndPuertos()];
        } else {
          console.error('El dato recibido no es el esperado o no es un array:', response);
          this.errorMessage = 'Los datos recibidos no tienen el formato esperado.';
        }

        this.loading = false;
      });
  }

  getUniqueBuquesAndPuertos(): string[] {
    const buques = Array.from(new Set(this.portCalls.map(pc => pc.buque)));
    const puertos = Array.from(new Set(this.portCalls.map(pc => pc.puerto)));
    return [...buques, ...puertos];
  }

  filterPortCalls() {
    this.filteredPortCalls = this.portCalls.filter(portCall =>
      portCall.buque.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      portCall.puerto.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onFilterChange(selectedFilter: string) {
    if (selectedFilter === 'Todos') {
      this.filteredPortCalls = [...this.portCalls];
    } else {
      this.filteredPortCalls = this.portCalls.filter(portCall =>
        portCall.buque === selectedFilter || portCall.puerto === selectedFilter
      );
    }
  }

  async editPortCall(portCall: any) {
    console.log('Edit port call', portCall);
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
          }
        }
      ]
    });

    await alert.present();
  }
}
