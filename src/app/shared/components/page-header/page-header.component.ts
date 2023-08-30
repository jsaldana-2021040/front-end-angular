import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styles: [
  ]
})
export class PageHeaderComponent {

  @Input() nombrePagina: string = 'Nombre de página';
  @Input() tipoIcono: string = 'fas';
  @Input() icono: string = 'file';
  @Input() rutaAgregar: string = 'agregar';
  @Input() mostrarBtnAgregar: boolean = true;

}
