import { Component } from '@angular/core';

@Component({
  selector: 'app-buques',
  template: `
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Buques</ion-title>
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
          <app-buque-list *ngSwitchCase="'list'"></app-buque-list>
          <app-buque-form *ngSwitchCase="'create'"></app-buque-form>
        </div>
      </div>
    </ion-content>
  `,
  styleUrls: ['./buques.page.scss']
})
export class BuquesPage {
  selectedSegment = 'list';
}