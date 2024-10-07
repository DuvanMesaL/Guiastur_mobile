import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boottom-meu',
  template: `
  <ion-tabs>
    <ion-tab-bar slot="bottom">
      <ion-tab-button tab="atenciones">
        <ion-icon name="boat"></ion-icon>
        <ion-label>Atenciones</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="buques">
        <ion-icon name="ship"></ion-icon>
        <ion-label>Buques</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="recaladas">
        <ion-icon name="navigate"></ion-icon>
        <ion-label>Recaladas</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="turnos">
        <ion-icon name="time"></ion-icon>
        <ion-label>Turnos</ion-label>
      </ion-tab-button>
      <ion-tab-button tab="usuarios">
        <ion-icon name="people"></ion-icon>
        <ion-label>Usuarios</ion-label>
      </ion-tab-button>
    </ion-tab-bar>
  </ion-tabs>
`
})
export class BottomBarComponent { }