import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: []
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() CantPaginas: number = 1;
  @Input() pagActual: number = 1;
  @Output() cambioPagina = new EventEmitter<number>();

  numeros: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.cargarListado()
  }

  ngOnInit(): void {
   this.cargarListado()
  }

  clicPag(pagClic:number): void {
    this.cambioPagina.emit(pagClic)
  }

  cargarListado() : void {
    this.numeros = [];
    for (let index = 1; index <=  this.CantPaginas; index++) {
      this.numeros.push(index)
    }
  }
}
