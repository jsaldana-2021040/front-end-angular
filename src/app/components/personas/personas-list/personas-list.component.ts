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

  filtros = new FormGroup({
    nombres: new FormControl<string | null>(''),
    apellidos: new FormControl<string | null>(''),
    tieneVisa: new FormControl<boolean | null>(null),
    activo: new FormControl<boolean | null>(true),
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
    this.cargar(1);

    this.filtros.controls.activo.valueChanges.subscribe(() => this.cargar(1));
    this.filtros.controls.tieneVisa.valueChanges.subscribe(() => this.cargar(1));
  }

  cargar(pagina: number) : void{

    let params = new HttpParams().append('pagina', pagina).append('porPagina', 2);

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

  delete( id: number) : void{
    this.personasSvc.delete(id).subscribe({
      next: res => {this.cargar(1)},
      error: err => {
        console.log('Error al insertar datos');
      }
    });
    this.showSuccess()
  }
}
