import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AlertController, AnimationController, IonInfiniteScroll, IonRefresher } from '@ionic/angular';
import { GetrecaladaintheportService } from '../../services/GetInThePort/getrecaladaintheport.service';
import { GerecaladabybuqueService } from '../../services/getBybuqueService/gerecaladabybuque.service';
import { GetrecaladaService } from '../../services/getServices/getrecalada.service';
import { catchError, finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

interface Recalada {
  id: number;
  buque_nombre: string;
  puerto_nombre: string;
  pais_nombre: string;
  fecha_arribo: { date: string };
  fecha_zarpe: { date: string };
  total_turistas: number;
}

@Component({
  selector: 'app-recaladas-list',
  templateUrl: './recalada-list.component.html',
  styleUrls: ['./recalada-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecaladasListComponent implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll!: IonInfiniteScroll;
  @ViewChild(IonRefresher) refresher!: IonRefresher;

  portCalls: Recalada[] = [];
  filteredPortCalls: Recalada[] = [];
  searchTerm = '';
  buques: string[] = [];
  puertos: string[] = [];
  selectedBuque = '';
  isInPort = false;
  activeFilters: string[] = [];
  loading = false;
  errorMessage = '';
  page = 1;
  pageSize = 20;
  loadedRecaladaIds = new Set<number>(); // IDs de recaladas ya cargadas para evitar duplicados

  constructor(
    private alertController: AlertController,
    private animationCtrl: AnimationController,
    private getRecaladaService: GetrecaladaService,
    private gerecaladaByBuqueService: GerecaladabybuqueService,
    private getRecaladaInThePortService: GetrecaladaintheportService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadRecaladas();
  }

  loadRecaladas(event?: any) {
    if (!event) {
      this.loading = true;
      this.errorMessage = '';
      this.page = 1;
      this.loadedRecaladaIds.clear(); // Limpiar IDs al iniciar nueva carga
    }
    this.cdr.detectChanges();

    let service: Observable<any>;

    if (this.selectedBuque) {
      service = this.gerecaladaByBuqueService.getRecaladasByBuque(parseInt(this.selectedBuque));
    } else if (this.isInPort) {
      service = this.getRecaladaInThePortService.getRecaladas();
    } else {
      service = this.getRecaladaService.getRecaladas();
    }

    service.pipe(
      catchError((error) => {
        console.error('Error al obtener recaladas:', error);
        this.errorMessage = 'Ocurrió un error al obtener las recaladas. Por favor, intente nuevamente.';
        return of({ status: 'error', data: { recaladas: [] } });
      }),
      finalize(() => {
        this.loading = false;
        if (event) {
          event.target.complete();
        }
        this.cdr.detectChanges();
      })
    ).subscribe((response: any) => {
      this.handleRecaladasResponse(response, event);
    });
  }

  handleRecaladasResponse(response: any, event?: any) {
    if (response && response.status === 'success' && Array.isArray(response.data.recaladas)) {
      const newRecaladas = response.data.recaladas.filter((recalada: Recalada) => !this.loadedRecaladaIds.has(recalada.id));
      newRecaladas.forEach((recalada: Recalada) => this.loadedRecaladaIds.add(recalada.id)); // Añadir IDs de nuevas recaladas

      if (this.page === 1) {
        this.portCalls = newRecaladas;
      } else {
        this.portCalls = [...this.portCalls, ...newRecaladas];
      }

      this.buques = Array.from(new Set(this.portCalls.map(pc => pc.buque_nombre)));
      this.puertos = Array.from(new Set(this.portCalls.map(pc => pc.pais_nombre)));
      this.applyFilters();

      // Desactivar infinite scroll si no hay más recaladas para cargar
      if (event && newRecaladas.length < this.pageSize) {
        event.target.disabled = true;
      }
    } else {
      this.errorMessage = 'Los datos recibidos no tienen el formato esperado.';
    }
    this.cdr.detectChanges();
  }

  applyFilters() {
    this.filteredPortCalls = this.portCalls.filter(portCall => {
      const matchesBuque = this.selectedBuque ? portCall.buque_nombre === this.selectedBuque : true;
      const matchesSearch = this.searchTerm ?
        portCall.buque_nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        portCall.pais_nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      const hasZarped = this.hasZarped(portCall);
      const matchesStatus = !this.isInPort || (this.isInPort && !hasZarped);

      return matchesBuque && matchesSearch && matchesStatus;
    });

    this.updateActiveFilters();
    this.animateFilteredItems();
    this.cdr.detectChanges();
  }

  updateActiveFilters() {
    this.activeFilters = [];
    if (this.selectedBuque) this.activeFilters.push(`Buque: ${this.selectedBuque}`);
    if (this.searchTerm) this.activeFilters.push(`Búsqueda: ${this.searchTerm}`);
    if (this.isInPort) this.activeFilters.push(`Estado: En Puerto`);
  }

  onSearchChange() {
    this.applyFilters();
  }

  clearFilters() {
    this.selectedBuque = '';
    this.searchTerm = '';
    this.isInPort = false;
    this.activeFilters = [];
    this.filteredPortCalls = [...this.portCalls];
    this.animateFilteredItems();
    this.cdr.detectChanges();
  }

  removeFilter(filter: string) {
    if (filter.startsWith('Buque:')) {
      this.selectedBuque = '';
    } else if (filter.startsWith('Búsqueda:')) {
      this.searchTerm = '';
    } else if (filter.startsWith('Estado:')) {
      this.isInPort = false;
    }
    this.applyFilters();
  }

  hasZarped(portCall: Recalada): boolean {
    return new Date(portCall.fecha_zarpe.date) < new Date();
  }

  async editPortCall(portCall: Recalada) {
    console.log('Edit port call', portCall);
    // Implementar lógica de edición aquí
  }

  async cancelPortCall(portCall: Recalada) {
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
            // Implementar lógica de cancelación aquí
          }
        }
      ]
    });

    await alert.present();
  }

  animateFilteredItems() {
    const animation = this.animationCtrl.create()
      .addElement(document.querySelectorAll('.port-call-item'))
      .duration(300)
      .fromTo('opacity', '0', '1')
      .fromTo('transform', 'translateY(20px)', 'translateY(0)');

    animation.play();
  }

  loadMoreData(event: any) {
    this.page++;
    this.loadRecaladas(event);
  }

  doRefresh(event: any) {
    this.page = 1;
    this.loadRecaladas(event);
    if (this.infiniteScroll) {
      this.infiniteScroll.disabled = false;
    }
  }

  toggleInPort() {
    this.isInPort = !this.isInPort;
    this.applyFilters();
  }
}
