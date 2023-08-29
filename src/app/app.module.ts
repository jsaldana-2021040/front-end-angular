import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
