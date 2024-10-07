import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <ion-app>
    <ion-split-pane contentId="main-content">
      <app-sidebar></app-sidebar>

      <ion-router-outlet id="main-content"></ion-router-outlet>
    </ion-split-pane>
  </ion-app>
  `,
})
export class AppComponent {
  constructor() {}


}