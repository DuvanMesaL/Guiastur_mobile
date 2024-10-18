import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtencionesPage } from './atenciones.page';

const routes: Routes = [
  {
    path: '',
    component: AtencionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtencionesPageRoutingModule {}
