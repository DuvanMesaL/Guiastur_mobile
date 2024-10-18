import { Component } from '@angular/core';
import { CreateAtencionService } from '../../services/createAtencionService/create-atencion.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-atencion-form',
  templateUrl: './atencion-form.component.html',
  styleUrls: ['./atencion-form.component.scss'],
})
export class AtencionFormComponent {
  newAtencion = {
    fecha_inicio: new Date().toISOString(),
    fecha_cierre: new Date().toISOString(),
    total_turnos: 0,
    observaciones: '',
    supervisor_id: '',
    recalada_id: 0,
  };

  constructor(
    private atencionService: CreateAtencionService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async createAtencion() {
    const loading = await this.loadingController.create({
      message: 'Creando atención...',
      spinner: 'circles',
      cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      const response = await this.atencionService.createAtencion(this.newAtencion).toPromise();
      await loading.dismiss();
      console.log('Atención creada exitosamente', response);
      await this.presentToast('La atención ha sido creada exitosamente.', 'success');
    } catch (error) {
      await loading.dismiss();
      console.error('Error al crear la atención:', error);
      await this.presentToast('Hubo un problema al crear la atención. Por favor, intente nuevamente.', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      cssClass: 'custom-toast'
    });
    toast.present();
  }
}