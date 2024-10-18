import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecaladasPageRoutingModule } from './recaladas-routing.module';

import { RecaladasListComponent } from './components/recalada-list/recalada-list.component';
import { RecaladasFormComponent } from './components/recalada-form/recalada-form.component';
import { FilterModalComponent } from 'src/app/components/filter-modal/filter-modal.component';
import { FilterButtonComponent } from 'src/app/components/filter-button-component/filter-button-component.component';

import { RecaladasPage } from './recaladas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecaladasPageRoutingModule
  ],
  declarations: [RecaladasPage, RecaladasListComponent, RecaladasFormComponent, FilterModalComponent, FilterButtonComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RecaladasPageModule {}
