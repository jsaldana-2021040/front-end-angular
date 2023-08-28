import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioBaseComponent } from './formulario-base/formulario-base.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formulario-base', component: FormularioBaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
