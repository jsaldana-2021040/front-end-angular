import { Component, Input, OnInit } from '@angular/core';
import { Empresas } from 'src/app/shared/interfaces/empresas';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Paginado } from 'src/app/shared/interfaces/paginado';


@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styles: [
  ]
})

export class EmpresasListComponent implements OnInit {

  pgEmpresas = new Paginado<Empresas>();

  filtros = new FormGroup({
    nombre: new FormControl<string | null>(''),
    direccion: new FormControl<string | null>(''),
    telefono: new FormControl<string | null>(''),
    activo: new FormControl<boolean | null>(true),
    porPagina: new FormControl<number>(10, {nonNullable: true}),
  });

  constructor(
    private empresasSvc: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  showSuccess() {
    this.toastr.success('Eliminado con exito', 'Todo bien', {
      positionClass: "toast-bottom-right"
    });
  }

  ngOnInit(): void {
    this.cargar(1, 10);

    this.filtros.controls.activo.valueChanges.subscribe(() => this.cargar(1, 10));
  }

  cargar(pagina: number, porPagina : number): void {
    let params = new HttpParams().append('pagina', pagina).append('porPagina', porPagina);

    if (this.filtros.controls.porPagina.value == null || this.filtros.controls.porPagina.value == 0 || this.filtros.controls.porPagina.value <= 0) {
      this.filtros.controls.porPagina.setValue(10)
    }

    for (const key in this.filtros.controls) {
      if (this.filtros.get(key)!.value !== null && this.filtros.get(key)!.value !== '') {
        params = params.append(key, this.filtros.get(key)!.value);
      }
    }

    this.empresasSvc.getPg(params).subscribe({
      next: res => this.pgEmpresas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  delete(id: number): void {
    this.empresasSvc.delete(id).subscribe({
      next: res => { this.cargar(1, this.filtros.controls.porPagina.value); },
      error: err => {
        console.log('Error al eliminar datos');
      }
    });
    this.showSuccess()
  }

}
