import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { Paginado } from 'src/app/shared/interfaces/paginado';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styles: [
  ]
})

export class UsuariosListComponent implements OnInit {
  
  pgUsuarios = new Paginado<Usuarios>();
  estadoFiltros: boolean = false;

  filtros = new FormGroup({
    email: new FormControl<string | null>(''),
    activo: new FormControl<boolean | null>(true),
    porPagina: new FormControl<number>(10, {nonNullable: true}),
  });

  constructor(
    private usuariosSvc: UsuariosService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.cargar(1, 10);

    this.filtros.controls.activo.valueChanges.subscribe(() => this.cargar(1, this.filtros.controls.porPagina.value!));
  }

  showSuccess() {
    this.toastr.success('Eliminado con exito', 'Todo bien', {
      positionClass:"toast-bottom-right"
    });
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

    this.usuariosSvc.getpg(params).subscribe({
      next: res => this.pgUsuarios = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  mostrarFiltros(): void {
    this.estadoFiltros = !this.estadoFiltros
  }

  delete( id: number) : void{
    this.usuariosSvc.delete(id).subscribe({
      next: res => {this.cargar(1, this.filtros.controls.porPagina.value!)},
      error: err => {
        console.log('Error al insertar datos');
      }
    });
    this.showSuccess()
  }
}
