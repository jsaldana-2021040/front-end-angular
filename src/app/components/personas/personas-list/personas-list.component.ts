import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/shared/interfaces/personas';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { Paginado } from 'src/app/shared/interfaces/paginado';


@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styles: [
  ]
})
export class PersonasListComponent implements OnInit {
  pgPersonas = new Paginado<Personas>();
  estadoFiltros: boolean = false;

  filtros = new FormGroup({
    nombres: new FormControl<string | null>(''),
    apellidos: new FormControl<string | null>(''),
    tieneVisa: new FormControl<boolean | null>(null),
    activo: new FormControl<boolean | null>(true),
    porPagina: new FormControl<number>(10, {nonNullable: true}),
  });

  constructor(
    private personasSvc: PersonasService,
    private toastr: ToastrService,
  ) { }

  showSuccess() {
    this.toastr.success('Editado con exito', 'Todo bien', {
      positionClass:"toast-bottom-right"
    });
  }

  ngOnInit(): void {
    this.cargar(1, 10);

    this.filtros.controls.activo.valueChanges.subscribe(() => this.cargar(1, this.filtros.controls.porPagina.value));
    this.filtros.controls.tieneVisa.valueChanges.subscribe(() => this.cargar(1, this.filtros.controls.porPagina.value));
  }

  cargar(pagina: number, porPagina : number) : void{

    let params = new HttpParams().append('pagina', pagina).append('porPagina', porPagina);

    if (this.filtros.controls.porPagina.value == null || this.filtros.controls.porPagina.value <= 0 || this.filtros.controls.porPagina.value % 1 != 0) {
      this.filtros.controls.porPagina.setValue(10)
      params = new HttpParams().append('pagina', pagina).append('porPagina', 10);
    }

    for (const key in this.filtros.controls) {
      if (this.filtros.get(key)!.value !== null && this.filtros.get(key)!.value !== '') {
        params = params.append(key, this.filtros.get(key)!.value);
      }
    }

    this.personasSvc.getpg(params).subscribe({
      next: res => this.pgPersonas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  mostrarFiltros(): void {
    this.estadoFiltros = !this.estadoFiltros
  }

  delete( id: number) : void{
    this.personasSvc.delete(id).subscribe({
      next: res => {this.cargar(1, this.filtros.controls.porPagina.value)},
      error: err => {
        console.log('Error al insertar datos');
      }
    });
    this.showSuccess()
  }
}
