import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulosConfigRoutingModule } from './modulos-config-routing.module';
import { ModulosConfigComponent } from './modulos-config.component';
import { PageHeaderComponent } from 'src/app/shared/components/page-header/page-header.component';
import { ModulosListComponent } from './components/modulos/modulos-list/modulos-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableContainerComponent } from 'src/app/shared/components/table-container/table-container.component';
import { ModulosFormComponent } from './components/modulos/modulos-form/modulos-form.component';
import { FormErrorsComponent } from 'src/app/shared/form-errors/form-errors.component';
import { PermisosListComponent } from './components/permisos/permisos-list/permisos-list.component';
import { PermisosFormComponent } from './components/permisos/permisos-form/permisos-form.component';
import { RolesListComponent } from './components/roles/roles-list/roles-list.component';
import { RolesFormComponent } from './components/roles/roles-form/roles-form.component';


@NgModule({
  declarations: [
    ModulosConfigComponent,
    ModulosListComponent,
    ModulosFormComponent,
    PermisosListComponent,
    PermisosFormComponent,
    RolesListComponent,
    RolesFormComponent
  ],
  imports: [
    CommonModule,
    ModulosConfigRoutingModule,
    PageHeaderComponent,
    ReactiveFormsModule,
    TableContainerComponent,
    FormErrorsComponent
  ]
})
export class ModulosConfigModule { }
