import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtencionFormComponent } from './components/atencion-form/atencion-form.component';
import { AtencionListComponent } from './components/atencion-list/atencion-list.component';

import { AtencionesPageRoutingModule } from './atenciones-routing.module';

import { AtencionesPage } from './atenciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtencionesPageRoutingModule
  ],
  declarations: [AtencionesPage, AtencionListComponent, AtencionFormComponent]
})
export class AtencionesPageModule {}
