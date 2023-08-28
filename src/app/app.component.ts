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

  personas: persona[] = [
    { nombres: 'Pedro Andrés', apellidos: 'Vega Stalling' },
    { nombres: 'Jose Roberto', apellidos: 'Saldaña Arrazola' },
    { nombres: 'Jonathan', apellidos: 'Monroy Guzman' },
  ]

  confirmarFormulario(): void {
    this.texto += '1'
    this.mostrarContenido = !this.mostrarContenido;
  }
}

interface persona {
  nombres: string;
  apellidos: string;
}