import { Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-paginador',
  templateUrl: './paginador.component.html',
  styleUrls: []
})
export class PaginadorComponent implements OnInit, OnChanges {

  @Input() CantPaginas: number = 1;
  @Input() pagActual: number = 1;
  @Output() cambioPagina = new EventEmitter<number>();

  pag = new FormControl<number>(1, {nonNullable : true , validators: Validators.required})

  numeros: number[] = [];
  mobile: boolean = false;
  width :number = window.screen.width

  ngOnChanges(changes: SimpleChanges): void {
    this.cargarListado()
  }

  ngOnInit(): void {
    this.cargarListado()
    if (window.screen.width <= 360) {
      this.mobile = true;
    }
  }

  clicPag(pagClic: number): void {
    this.cambioPagina.emit(pagClic)
  }

  cargarListado(): void {
    this.numeros = [];
    for (let index = 1; index <= this.CantPaginas; index++) {
      this.numeros.push(index)
    }
  }

  setPag(): void {
    if (this.pag.value! <= this.CantPaginas && this.pag.value! > 0 && this.pag.value != null && this.pag.value % 1 == 0 ) {
      this.clicPag(this.pag.value)
    } else {
      this.pag.setValue(this.pagActual)
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.width = window.screen.width;
  }
}
