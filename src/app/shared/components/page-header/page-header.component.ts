import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styles: [
  ],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PageHeaderComponent {

  @Input() nombrePagina: string = 'Nombre de página';
  @Input() tipoIcono: string = 'fas';
  @Input() icono: string = 'file';
  @Input() rutaAgregar: string = 'agregar';
  @Input() mostrarBtnAgregar: boolean = true;

}
