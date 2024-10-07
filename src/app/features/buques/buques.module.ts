import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuqueListComponent } from './components/buque-list/buque-list.component';
import { BuqueFormComponent } from './components/buque-form/buque-form.component';

import { BuquesPageRoutingModule } from './buques-routing.module';

import { BuquesPage } from './buques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuquesPageRoutingModule
  ],
  declarations: [BuquesPage, BuqueListComponent, BuqueFormComponent]
})
export class BuquesPageModule {}
