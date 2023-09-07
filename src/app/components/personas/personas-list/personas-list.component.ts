import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/shared/interfaces/personas';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styles: [
  ]
})
export class PersonasListComponent implements OnInit {
  listPersonas: Personas[] = [];

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
    this.personasSvc.get().subscribe({
      next: res => this.listPersonas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  cargar() : void{
    this.personasSvc.get().subscribe({
      next: res => this.listPersonas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  delete( id: number) : void{
    this.personasSvc.delete(id).subscribe({
      next: res => {this.cargar()},
      error: err => {
        console.log('Error al insertar datos');
      }
    });
    this.showSuccess()
  }
}
