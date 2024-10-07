import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <app-sidebar></app-sidebar>
      <ion-router-outlet id="main-content"></ion-router-outlet>
      <app-boottom-meu></app-boottom-meu>
    </ion-app>
  `
})
export class AppComponent {
  constructor() {}
}