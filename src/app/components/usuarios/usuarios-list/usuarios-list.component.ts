import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styles: [
  ]
})
export class UsuariosListComponent implements OnInit {
  listUsuarios: Usuarios[] = [];

  constructor(
    private usuariosSvc: UsuariosService,
    private toastr: ToastrService,
  ) { }

  showSuccess() {
    this.toastr.success('Eliminado con exito', 'Todo bien', {
      positionClass:"toast-bottom-right"
    });
  }

  cargar() : void{
    this.usuariosSvc.get().subscribe({
      next: res => this.listUsuarios = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  delete( id: number) : void{
    this.usuariosSvc.delete(id).subscribe({
      next: res => {this.cargar()},
      error: err => {
        console.log('Error al insertar datos');
      }
    });
    this.showSuccess()
  }

  ngOnInit(): void {
    this.usuariosSvc.get().subscribe({
      next: res => this.listUsuarios = res,
      error: err => console.log('Error al obtener datos')
    });
  }
}
