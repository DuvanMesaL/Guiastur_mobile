import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { GetrecaladaService } from '../../services/getServices/getrecalada.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-recaladas-list',
  templateUrl: './recalada-list.component.html',
  styleUrls: ['./recalada-list.component.scss']
})
export class RecaladasListComponent implements OnInit {
  portCalls: any[] = [];
  filteredPortCalls: any[] = [];
  searchTerm = '';
  buques: string[] = [];
  puertos: string[] = [];
  selectedBuque = '';
  selectedPuerto = '';
  activeFilters: string[] = [];
  segmentValue = 'buque';
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
          this.buques = Array.from(new Set(this.portCalls.map(pc => pc.buque_nombre)));
          this.puertos = Array.from(new Set(this.portCalls.map(pc => pc.pais_nombre)));
        } else {
          console.error('El dato recibido no es el esperado o no es un array:', response);
          this.errorMessage = 'Los datos recibidos no tienen el formato esperado.';
        }

        this.loading = false;
      });
  }

  applyFilters() {
    this.filteredPortCalls = this.portCalls.filter(portCall => {
      const matchesBuque = this.selectedBuque ? portCall.buque_nombre === this.selectedBuque : true;
      const matchesPuerto = this.selectedPuerto ? portCall.pais_nombre === this.selectedPuerto : true;
      const matchesSearch = this.searchTerm ?
        portCall.buque_nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        portCall.pais_nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;

      return matchesBuque && matchesPuerto && matchesSearch;
    });

    this.updateActiveFilters();
  }

  updateActiveFilters() {
    this.activeFilters = [];
    if (this.selectedBuque) this.activeFilters.push(`Buque: ${this.selectedBuque}`);
    if (this.selectedPuerto) this.activeFilters.push(`Puerto: ${this.selectedPuerto}`);
    if (this.searchTerm) this.activeFilters.push(`Búsqueda: ${this.searchTerm}`);
  }

  onSegmentChange(event: any) {
    this.segmentValue = event.detail.value;
  }

  onFilterChange(type: 'buque' | 'puerto', value: string) {
    if (type === 'buque') {
      this.selectedBuque = value;
      this.selectedPuerto = '';
    } else {
      this.selectedPuerto = value;
      this.selectedBuque = '';
    }
    this.applyFilters();
  }

  onModelChange(value: string) {
    if (this.segmentValue === 'buque') {
      this.selectedBuque = value;
      this.selectedPuerto = '';
    } else {
      this.selectedPuerto = value;
      this.selectedBuque = '';
    }
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  onSelectChange(event: any) {
    const selectedValue = event.detail.value;
    if (this.segmentValue === 'buque') {
      this.selectedBuque = selectedValue;
      this.selectedPuerto = '';
    } else {
      this.selectedPuerto = selectedValue;
      this.selectedBuque = '';
    }
    this.applyFilters();
  }

  clearFilters() {
    this.selectedBuque = '';
    this.selectedPuerto = '';
    this.searchTerm = '';
    this.activeFilters = [];
    this.filteredPortCalls = [...this.portCalls];
  }

  removeFilter(filter: string) {
    if (filter.startsWith('Buque:')) {
      this.selectedBuque = '';
    } else if (filter.startsWith('Puerto:')) {
      this.selectedPuerto = '';
    } else if (filter.startsWith('Búsqueda:')) {
      this.searchTerm = '';
    }
    this.applyFilters();
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