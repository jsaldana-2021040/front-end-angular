import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styles: [
  ]
})
export class UsuariosListComponent {
  listUsuarios: Usuarios[] = [];

  constructor(
    private usuariosSvc: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuariosSvc.get().subscribe({
      next: res => this.listUsuarios = res,
      error: err => console.log('Error al obtener datos')
    });
  }
}
