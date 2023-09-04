import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  texto = ''


  mostrarContenido: boolean = false;

  confirmarFormulario(): void {
    this.texto += '1'
    this.mostrarContenido = !this.mostrarContenido;
  }
}