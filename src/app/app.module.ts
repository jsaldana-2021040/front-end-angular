import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormularioBaseComponent } from './formulario-base/formulario-base.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EmpresasListComponent } from './components/empresas/empresas-list/empresas-list.component';
import { PersonasListComponent } from './components/personas/personas-list/personas-list.component';
import { UsuariosListComponent } from './components/usuarios/usuarios-list/usuarios-list.component';
import { PageHeaderComponent } from './shared/components/page-header/page-header.component';
import { EmpresasCreateComponent } from './components/empresas/empresas-create/empresas-create.component';
import { PersonasCreateComponent } from './components/personas/personas-create/personas-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosCreateComponent } from './components/usuarios/usuarios-create/usuarios-create.component';
import { FormErrorsComponent } from './shared/form-errors/form-errors.component';
import { EmpresasEditComponent } from './components/empresas/empresas-edit/empresas-edit.component';
import { PersonasEditComponent } from './components/personas/personas-edit/personas-edit.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CommonModule } from '@angular/common';

import { ToastrModule } from 'ngx-toastr';
import { UsuariosEditComponent } from './components/usuarios/usuarios-edit/usuarios-edit.component';
import { LoginComponent } from './components/login/login/login.component';
import { TokenInterceptorInterceptor } from './shared/utils/token-interceptor.interceptor';
import { PaginadorComponent } from './shared/components/paginador/paginador.component';
import { TableContainerComponent } from './shared/components/table-container/table-container.component';
import { PokeApiListComponent } from './components/pokeApi/poke-api-list/poke-api-list.component';
import { PokeApiDetailsComponent } from './components/pokeApi/poke-api-details/poke-api-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormularioBaseComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    NotFoundComponent,
    EmpresasListComponent,
    PersonasListComponent,
    UsuariosListComponent,
    PageHeaderComponent,
    EmpresasCreateComponent,
    PersonasCreateComponent,
    UsuariosCreateComponent,
    FormErrorsComponent,
    EmpresasEditComponent,
    PersonasEditComponent,
    UsuariosEditComponent,
    LoginComponent,
    PaginadorComponent,
    TableContainerComponent,
    PokeApiListComponent,
    PokeApiDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot({
      autoDismiss: true
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
