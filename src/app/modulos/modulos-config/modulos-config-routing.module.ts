import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulosConfigComponent } from './modulos-config.component';
import { ModulosListComponent } from './components/modulos/modulos-list/modulos-list.component';
import { ModulosFormComponent } from './components/modulos/modulos-form/modulos-form.component';
import { PermisosListComponent } from './components/permisos/permisos-list/permisos-list.component';
import { PermisosFormComponent } from './components/permisos/permisos-form/permisos-form.component';
import { RolesListComponent } from './components/roles/roles-list/roles-list.component';
import { RolesFormComponent } from './components/roles/roles-form/roles-form.component';

const routes: Routes = [
  { path: '', component: ModulosConfigComponent },
  { path: 'modulos', component: ModulosListComponent},
  { path: 'modulos/agregar', component: ModulosFormComponent},
  { path: 'modulos/:id', component: ModulosFormComponent},
  { path: 'permisos', component: PermisosListComponent},
  { path: 'permisos/agregar', component: PermisosFormComponent},
  { path: 'permisos/:id', component: PermisosFormComponent},
  { path: 'roles', component: RolesListComponent},
  { path: 'roles/agregar', component: RolesFormComponent},
  { path: 'roles/:id', component: RolesFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosConfigRoutingModule { }
