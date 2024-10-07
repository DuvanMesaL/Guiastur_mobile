import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-layout',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ pageTitle || 'Sin título' }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ng-content></ng-content>
    </ion-content>
  `,
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent {
  @Input() pageTitle?: string; // La propiedad es opcional ahora
}
