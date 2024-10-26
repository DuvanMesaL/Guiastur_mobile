import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ion-app>
      <app-sidebar></app-sidebar>
      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-app>
  `
})
export class AppComponent {
  constructor() {
    document.body.classList.add('dark');
  }
}