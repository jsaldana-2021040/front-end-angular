import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularioBaseComponent } from './formulario-base/formulario-base.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { EmpresasListComponent } from './components/empresas/empresas-list/empresas-list.component';
import { PersonasListComponent } from './components/personas/personas-list/personas-list.component';
import { UsuariosListComponent } from './components/usuarios/usuarios-list/usuarios-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'formulario-base', component: FormularioBaseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'empresas', component: EmpresasListComponent },
  { path: 'personas', component: PersonasListComponent },
  { path: 'usuarios', component: UsuariosListComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
