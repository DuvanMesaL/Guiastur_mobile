import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-header',
  template: `
    <ion-header>
      <ion-toolbar color="dark">
        <ion-title>Menú</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="closeMenu()">
            <ion-icon name="close-outline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
  `,
  styleUrls: ['./sidebar-header.component.scss'],
})
export class SidebarHeaderComponent {
  constructor() {}

  closeMenu() {
  }
}
