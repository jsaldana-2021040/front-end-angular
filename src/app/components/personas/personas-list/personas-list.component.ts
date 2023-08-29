import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/shared/interfaces/personas';
import { personasService } from 'src/app/shared/services/personas.service';

@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styles: [
  ]
})
export class PersonasListComponent implements OnInit {
  listPersonas: Personas[] = [];

  constructor(
    private personasSvc: personasService
  ) { }

  ngOnInit(): void {
    this.personasSvc.get().subscribe({
      next: res => this.listPersonas = res,
      error: err => console.log('Error al obtener datos')
    });
  }
}
