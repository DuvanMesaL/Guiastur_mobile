import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  template: `
    <ion-menu contentId="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menú</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle auto-hide="false" *ngFor="let p of appPages">
            <ion-item [routerDirection]="'root'" [routerLink]="[p.url]">
              <ion-icon slot="start" [name]="p.icon"></ion-icon>
              <ion-label>
                {{p.title}}
              </ion-label>
            </ion-item>
          </ion-menu-toggle>
        </ion-list>
      </ion-content>
    </ion-menu>
  `
})
export class SidebarComponent {
  appPages = [
    { title: 'Atenciones', url: '/atenciones', icon: 'boat' },
    { title: 'Buques', url: '/buques', icon: 'ship' },
    { title: 'Recaladas', url: '/recaladas', icon: 'navigate' },
    { title: 'Turnos', url: '/turnos', icon: 'time' },
    { title: 'Usuarios', url: '/users', icon: 'people' }
  ];
}