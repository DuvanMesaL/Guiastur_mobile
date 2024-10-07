import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Usuarios</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="segment-container">
        <ion-segment [(ngModel)]="selectedSegment" mode="ios">
          <ion-segment-button value="list">
            <ion-label>Listar</ion-label>
          </ion-segment-button>
          <ion-segment-button value="create">
            <ion-label>Crear</ion-label>
          </ion-segment-button>
        </ion-segment>
      </div>

      <div class="content-container">
        <div [ngSwitch]="selectedSegment">
          <app-user-list *ngSwitchCase="'list'"></app-user-list>
          <app-user-form *ngSwitchCase="'create'"></app-user-form>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./users.page.scss']
})
export class UsersPage {
  selectedSegment = 'list';
}