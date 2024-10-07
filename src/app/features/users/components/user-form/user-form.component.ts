import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CreateuserService } from '../../services/cerateService/createuser.service';

interface Role {
  id: number;
  name: string;
}

@Component({
  selector: 'app-user-form',
  template: `
    <form (ngSubmit)="onSubmit()">
      <ion-list>
        <ion-item>
          <ion-label position="floating">Nombre</ion-label>
          <ion-input [(ngModel)]="user.nombre" name="nombre" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label position="floating">Email</ion-label>
          <ion-input [(ngModel)]="user.email" name="email" type="email" required></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>Rol</ion-label>
          <ion-select [(ngModel)]="user.rol_id" name="rol_id" required>
            <ion-select-option *ngFor="let rol of roles" [value]="rol.id">{{ rol.name }}</ion-select-option>
          </ion-select>
        </ion-item>
      </ion-list>
      <ion-button expand="block" type="submit">Crear Usuario</ion-button>
    </form>
  `
})
export class UserFormComponent implements OnInit {
  user = {
    nombre: '',
    email: '',
    rol_id: ''
  };

  roles: Role[] = [];  // Cambia la estructura para que sea un array de roles con id y name

  constructor(
    private toastController: ToastController,
    private createUserService: CreateuserService
  ) {}

  ngOnInit() {
    this.loadRoles();  // Carga los roles al inicializar el componente
  }

  loadRoles() {
    this.createUserService.getRoles().subscribe(
      (roles: Role[]) => {
        // Verifica que los roles tengan la estructura correcta antes de asignarlos
        if (roles.length > 0 && roles[0].id && roles[0].name) {
          this.roles = roles;
        } else {
          console.error('La estructura de roles no es la esperada.');
        }
      },
      async (error) => {
        console.error('Error al cargar los roles:', error);
        const toast = await this.toastController.create({
          message: 'Error al cargar roles',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    );
  }

  async onSubmit() {
    console.log('Crear usuario', this.user);

    if (this.user.nombre && this.user.email && this.user.rol_id) {
      this.createUserService.createUser(this.user).subscribe(
        async (response) => {
          const toast = await this.toastController.create({
            message: 'Usuario creado exitosamente',
            duration: 2000,
            color: 'success'
          });
          toast.present();

          this.user = {
            nombre: '',
            email: '',
            rol_id: ''
          };
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: 'Error al crear el usuario',
            duration: 2000,
            color: 'danger'
          });
          toast.present();
        }
      );
    }
  }
}
