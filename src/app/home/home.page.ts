import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  ionViewWillEnter() {
    console.log('Home page is about to enter');
  }

  ionViewDidEnter() {
    console.log('Home page has fully entered');
  }
}
