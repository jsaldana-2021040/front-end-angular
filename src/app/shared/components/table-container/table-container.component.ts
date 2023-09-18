import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styles: [
  ]
})
export class TableContainerComponent {

  @Input() paginas: number = 1;
  @Input() actual: number = 1;
  @Output() cambioPagina = new EventEmitter<number>();

}
