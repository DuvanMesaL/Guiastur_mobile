import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private menu: MenuController, private router: Router) {}

  openMenu() {
    this.menu.open();
  }

  closeMenu() {
    this.menu.close();
  }

  async navigateTo(path: string) {
    await this.menu.close();
    this.router.navigate([path], { replaceUrl: true });
  }
}
