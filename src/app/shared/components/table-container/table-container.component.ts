import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginadorComponent } from '../paginador/paginador.component';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styles: [
  ],
  standalone: true,
  imports: [
    CommonModule,
    PaginadorComponent
  ]
})
export class TableContainerComponent {

  @Input() paginas: number = 1;
  @Input() actual: number = 1;
  @Output() cambioPagina = new EventEmitter<number>();

}
