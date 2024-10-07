import { Component } from '@angular/core';

@Component({
  selector: 'app-recaladas',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Recaladas</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-segment [(ngModel)]="selectedSegment">
        <ion-segment-button value="list">
          <ion-label>Listar</ion-label>
        </ion-segment-button>
        <ion-segment-button value="create">
          <ion-label>Crear</ion-label>
        </ion-segment-button>
      </ion-segment>

      <div [ngSwitch]="selectedSegment">
        <app-recalada-list *ngSwitchCase="'list'"></app-recalada-list>
        <app-recalada-form *ngSwitchCase="'create'"></app-recalada-form>
      </div>
    </ion-content>
  `
})
export class RecaladasPage {
  selectedSegment = 'list';
}