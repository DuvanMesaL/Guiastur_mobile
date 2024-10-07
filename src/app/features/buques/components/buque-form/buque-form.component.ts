import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CreatebuqueService } from '../../services/createService/createbuque.service';

@Component({
  selector: 'app-buque-form',
  template: `
    <div class="buque-form-container">
      <h2 class="form-title">Nuevo Buque</h2>

      <form (ngSubmit)="onSubmit()" class="buque-form">
        <div class="form-group">
          <ion-label>Código del Buque</ion-label>
          <ion-input [(ngModel)]="buque.codigo" name="codigo" required class="custom-input" placeholder="Ingrese el código"></ion-input>
        </div>

        <div class="form-group">
          <ion-label>Nombre del Buque</ion-label>
          <ion-input [(ngModel)]="buque.nombre" name="nombre" required class="custom-input" placeholder="Ingrese el nombre"></ion-input>
        </div>

        <ion-button expand="block" type="submit" class="submit-button">
          <span class="button-text">Crear Buque</span>
        </ion-button>
      </form>
    </div>
  `,
  styleUrls: ['./buque-form.component.scss']
})
export class BuqueFormComponent {
  buque = {
    codigo: '',
    nombre: ''
  };

  constructor(
    private toastController: ToastController,
    private createBuqueService: CreatebuqueService
  ) {}

  async onSubmit() {
    if (this.buque.codigo && this.buque.nombre) {
      this.createBuqueService.createBuque(this.buque).subscribe(
        async (response) => {
          const toast = await this.toastController.create({
            message: 'Buque creado exitosamente',
            duration: 2000,
            color: 'success'
          });
          toast.present();

          this.buque = {
            codigo: '',
            nombre: ''
          };
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: 'Error al crear el buque',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    } else {
      const toast = await this.toastController.create({
        message: 'Todos los campos son obligatorios.',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
    }
  }
}