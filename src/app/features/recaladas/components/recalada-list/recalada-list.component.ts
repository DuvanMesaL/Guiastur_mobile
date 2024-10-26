import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GetrecaladaService } from '../../services/getServices/getrecalada.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-recaladas-list',
  templateUrl:'./recalada-list.component.html'
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