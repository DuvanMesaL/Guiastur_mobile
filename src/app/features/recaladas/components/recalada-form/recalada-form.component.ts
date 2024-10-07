import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CreaterecaladaService } from '../../services/createService/createrecalada.service';
import { GetbuqueService } from 'src/app/features/buques/services/getService/getbuque.service';
import { GetpaisService } from 'src/app/features/pais/Services/getservice/getpais.service';

@Component({
  selector: 'app-recalada-form',
  templateUrl: './recalada-form.component.html',
  styleUrls: ['./recalada-form.component.scss'],
})

export class RecaladasFormComponent implements OnInit {
  recal = {
    buque_id: '',
    pais_id: '',
    total_turistas: 0,
    observaciones: ''
  };

  fechaArribo = {
    anio: '',
    mes: '',
    dia: '',
    hora: '',
    minutos: ''
  };

  fechaZarpe = {
    anio: '',
    mes: '',
    dia: '',
    hora: '',
    minutos: ''
  };

  searchTextPais = '';
  searchTextBuque = '';
  countries: any[] = [];
  filteredCountries: any[] = [];
  buques: any[] = [];
  filteredBuques: any[] = [];

  constructor(
    private CreaterecaladaService: CreaterecaladaService,
    private GetpaisService: GetpaisService,
    private GetbuqueService: GetbuqueService,
    private router: Router,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.setFechaArriboActual();
    this.setFechaZarpeActual();
    this.getPaises();
    this.getBuques();
  }

  setFechaArriboActual() {
    const now = new Date();
    this.fechaArribo.anio = now.getFullYear().toString();
    this.fechaArribo.mes = this.padZero((now.getMonth() + 1).toString());
    this.fechaArribo.dia = this.padZero(now.getDate().toString());
    this.fechaArribo.hora = this.padZero(now.getHours().toString());
    this.fechaArribo.minutos = this.padZero(now.getMinutes().toString());
  }

  setFechaZarpeActual() {
    const now = new Date();
    this.fechaZarpe.anio = now.getFullYear().toString();
    this.fechaZarpe.mes = this.padZero((now.getMonth() + 1).toString());
    this.fechaZarpe.dia = this.padZero(now.getDate().toString());
    this.fechaZarpe.hora = this.padZero(now.getHours().toString());
    this.fechaZarpe.minutos = this.padZero(now.getMinutes().toString());
  }

  getPaises() {
    this.GetpaisService.getPaises().subscribe(
      (response: any) => {
        console.log("Respuesta recibida:", response);
        if (response && response.status === 'success' && Array.isArray(response.data)) {
          this.countries = response.data;
          this.filteredCountries = this.countries;
        } else {
          this.countries = [];
          this.filteredCountries = this.countries;
          console.error("No se encontraron países en la respuesta.");
        }
      },
      async (error) => {
        console.error("Error al obtener países:", error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al cargar los países.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  getBuques() {
    this.GetbuqueService.getBuques().subscribe(
      (response: any) => {
        console.log("Respuesta de buques recibida:", response);
        if (response.status === 'success' && Array.isArray(response.data)) {
          this.buques = response.data;
          this.filteredBuques = this.buques;
        } else {
          this.buques = [];
          this.filteredBuques = this.buques;
          console.error("No se encontraron buques en la respuesta.");
        }
      },
      async (error) => {
        console.error("Error al obtener buques:", error);
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al cargar los buques.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  filterCountries(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredCountries = this.countries.filter((pais) =>
        pais.nombre.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredCountries = this.countries;
    }
  }

  filterBuques(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.trim() !== '') {
      this.filteredBuques = this.buques.filter((buque) =>
        buque.nombre.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredBuques = this.buques;
    }
  }

  async onSubmit() {
    const isValid = this.isFechaArriboValida() && this.isFechaZarpeValida() && this.recal.buque_id && this.recal.pais_id && this.recal.total_turistas > 0;

    if (!isValid) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Todos los campos son obligatorios y el formato de la fecha debe ser válido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const fechaArribo = this.formatearFecha(this.fechaArribo);
    const fechaZarpe = this.formatearFecha(this.fechaZarpe);

    const recalData = {
      ...this.recal,
      fecha_arribo: fechaArribo,
      fecha_zarpe: fechaZarpe,
    };

    this.CreaterecaladaService.createRecalada(recalData).subscribe(
      async (response) => {
        if (response && response.status === 'success') {
          const alert = await this.alertController.create({
            header: 'Éxito',
            message: 'Recalada creada exitosamente.',
            buttons: ['OK'],
          });
          await alert.present();
          this.router.navigate(['/home']);
        } else {
          const alert = await this.alertController.create({
            header: 'Error',
            message: response.message || 'No se pudo crear la recalada.',
            buttons: ['OK'],
          });
          await alert.present();
        }
      },
      async (error) => {
        const errorMessage = error.error?.message || 'Hubo un problema al crear la recalada.';
        const alert = await this.alertController.create({
          header: 'Error',
          message: errorMessage,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  isFechaArriboValida(): boolean {
    const { anio, mes, dia, hora, minutos } = this.fechaArribo;
    return this.isFechaValida(anio, mes, dia, hora, minutos);
  }

  isFechaZarpeValida(): boolean {
    const { anio, mes, dia, hora, minutos } = this.fechaZarpe;
    return this.isFechaValida(anio, mes, dia, hora, minutos);
  }

  isFechaValida(anio: string, mes: string, dia: string, hora: string, minutos: string): boolean {
    const anioNum = Number(anio);
    const mesNum = Number(mes);
    const diaNum = Number(dia);
    const horaNum = Number(hora);
    const minutosNum = Number(minutos);

    return (
      !isNaN(anioNum) && anioNum > 0 &&
      !isNaN(mesNum) && mesNum >= 1 && mesNum <= 12 &&
      !isNaN(diaNum) && diaNum >= 1 && diaNum <= 31 &&
      !isNaN(horaNum) && horaNum >= 0 && horaNum < 24 &&
      !isNaN(minutosNum) && minutosNum >= 0 && minutosNum < 60
    );
  }

  formatearFecha(fecha: any): string {
    const { anio, mes, dia, hora, minutos } = fecha;
    return `${anio}-${this.padZero(mes)}-${this.padZero(dia)}T${this.padZero(hora)}:${this.padZero(minutos)}`;
  }

  padZero(value: any): string {
    return String(value).padStart(2, '0');
  }
}
