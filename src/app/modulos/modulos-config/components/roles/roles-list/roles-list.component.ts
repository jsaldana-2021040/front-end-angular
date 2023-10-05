import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Paginado } from 'src/app/shared/interfaces/paginado';
import { Roles } from 'src/app/shared/interfaces/roles';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styles: [
  ]
})
export class RolesListComponent {

  pgRoles = new Paginado<Roles>();
  estadoFiltros: boolean = false;
  accion: string = ''

  filtros = new FormGroup({
    nombre: new FormControl<string | null>(''),
    activo: new FormControl<boolean | null>(true),
    porPagina: new FormControl<number>(10, { nonNullable: true }),
  });

  constructor(
    private rolesSvc: RolesService,
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

    this.rolesSvc.getPg(params).subscribe({
      next: res => this.pgRoles = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  mostrarFiltros(): void {
    this.estadoFiltros = !this.estadoFiltros
  }

  delete(id: number): void {
    this.rolesSvc.delete(id).subscribe({
      next: res => { this.cargar(1, this.filtros.controls.porPagina.value); },
      error: err => {
        console.log('Error al eliminar datos');
      }
    });
    this.showSuccess()
  }
}
