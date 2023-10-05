import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Permisos } from 'src/app/shared/interfaces/Permisos';
import { Paginado } from 'src/app/shared/interfaces/paginado';
import { permisosService } from 'src/app/shared/services/permisos.service';

@Component({
  selector: 'app-permisos-list',
  templateUrl: './permisos-list.component.html',
  styles: [
  ]
})
export class PermisosListComponent {

  pgPermisos = new Paginado<Permisos>();
  estadoFiltros: boolean = false;
  accion: string = ''

  filtros = new FormGroup({
    permiso: new FormControl<string | null>(''),
    activo: new FormControl<boolean | null>(true),
    porPagina: new FormControl<number>(10, { nonNullable: true }),
  });

  constructor(
    private permisosSvc: permisosService,
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

  cargar(pagina: number, porPagina: number): void {
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

    this.permisosSvc.getPg(params).subscribe({
      next: res => this.pgPermisos = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  mostrarFiltros(): void {
    this.estadoFiltros = !this.estadoFiltros
  }

  delete(id: number): void {
    this.permisosSvc.delete(id).subscribe({
      next: res => { this.cargar(1, this.filtros.controls.porPagina.value); },
      error: err => {
        console.log('Error al eliminar datos');
      }
    });
    this.showSuccess()
  }
}
