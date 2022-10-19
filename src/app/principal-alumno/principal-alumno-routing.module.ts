import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalAlumnoPage } from './principal-alumno.page';

const routes: Routes = [
  {
    path: '',
    component: PrincipalAlumnoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrincipalAlumnoPageRoutingModule {}
