import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-user-list',
  template: `
    <ion-searchbar [(ngModel)]="searchTerm" (ionChange)="filterUsers()"></ion-searchbar>

    <ion-list>
      <ion-item-sliding *ngFor="let user of filteredUsers">
        <ion-item>
          <ion-label>
            <h2>{{ user.nombre }}</h2>
            <p>{{ user.email }}</p>
            <ion-badge color="primary">{{ user.rol }}</ion-badge>
          </ion-label>
        </ion-item>
        <ion-item-options side="end">
          <ion-item-option (click)="editUser(user)" color="primary">
            <ion-icon slot="icon-only" name="create"></ion-icon>
          </ion-item-option>
          <ion-item-option (click)="deleteUser(user)" color="danger">
            <ion-icon slot="icon-only" name="trash"></ion-icon>
          </ion-item-option>
        </ion-item-options>
      </ion-item-sliding>
    </ion-list>
  `
})
export class UserListComponent {
  users = [
    { id: 1, nombre: "Usuario 1", email: "usuario1@example.com", rol: "Administrador" },
    { id: 2, nombre: "Usuario 2", email: "usuario2@example.com", rol: "Operador" },
    { id: 3, nombre: "Usuario 3", email: "usuario3@example.com", rol: "Visualizador" },
  ];

  filteredUsers = [...this.users];
  searchTerm = '';

  constructor(private alertController: AlertController) {}

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  async editUser(user: any) {
    console.log('Edit user', user);
    // Implement edit logic here
  }

  async deleteUser(user: any) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: `¿Está seguro de que desea eliminar a ${user.nombre}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Delete user', user);
            // Implement delete logic here
          }
        }
      ]
    });

    await alert.present();
  }
}