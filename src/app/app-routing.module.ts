import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { FormularioBaseComponent } from './formulario-base/formulario-base.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AboutComponent } from './about/about.component';
import { EmpresasListComponent } from './components/empresas/empresas-list/empresas-list.component';
import { PersonasListComponent } from './components/personas/personas-list/personas-list.component';
import { UsuariosListComponent } from './components/usuarios/usuarios-list/usuarios-list.component';
import { EmpresasCreateComponent } from './components/empresas/empresas-create/empresas-create.component';
import { PersonasCreateComponent } from './components/personas/personas-create/personas-create.component';
import { UsuariosCreateComponent } from './components/usuarios/usuarios-create/usuarios-create.component';
import { EmpresasEditComponent } from './components/empresas/empresas-edit/empresas-edit.component';
import { PersonasEditComponent } from './components/personas/personas-edit/personas-edit.component';
import { UsuariosEditComponent } from './components/usuarios/usuarios-edit/usuarios-edit.component';
import { LoginComponent } from './components/login/login/login.component';
import { personasGuard } from './shared/guards/personas-guard.guard';
import { empresasGuard } from './shared/guards/empresas-guard.guard';
import { usuariosGuard } from './shared/guards/usuarios-guard.guard';
import { PokeApiContainerComponent } from './components/pokeApi/poke-api-container/poke-api-container.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'formulario-base', component: FormularioBaseComponent },
  { path: 'about', component: AboutComponent },
  { path: 'empresas', component: EmpresasListComponent, canActivate:[empresasGuard]},
  { path: 'empresas/agregar', component: EmpresasCreateComponent, canActivate:[empresasGuard],},
  { path: 'empresas/editar/:id', component: EmpresasEditComponent, canActivate:[empresasGuard]},
  { path: 'personas', component: PersonasListComponent, canActivate:[personasGuard],},
  { path: 'personas/agregar', component: PersonasCreateComponent , canActivate:[personasGuard]},
  { path: 'personas/editar/:id', component: PersonasEditComponent , canActivate:[personasGuard]},
  { path: 'usuarios', component: UsuariosListComponent, canActivate:[usuariosGuard]},
  { path: 'usuarios/agregar', component: UsuariosCreateComponent, canActivate:[usuariosGuard]},
  { path: 'usuarios/editar/:id', component: UsuariosEditComponent, canActivate:[usuariosGuard]},
  { path: 'pokeapi', component: PokeApiContainerComponent},
  { path: 'configuracion', loadChildren: () => import('./modulos/modulos-config/modulos-config.module').then(m => m.ModulosConfigModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
