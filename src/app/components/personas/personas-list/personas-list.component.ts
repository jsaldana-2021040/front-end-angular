import { Component, OnInit } from '@angular/core';
import { Personas } from 'src/app/shared/interfaces/personas';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { Router } from '@angular/router';


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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personasSvc.get().subscribe({
      next: res => this.listPersonas = res,
      error: err => console.log('Error al obtener datos')
    });
  }
}
