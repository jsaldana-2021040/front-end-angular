import { Component, OnInit } from '@angular/core';
import { Empresas } from 'src/app/shared/interfaces/empresas';
import { EmpresasService } from 'src/app/shared/services/empresas.service';

@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styles: [
  ]
})
export class EmpresasListComponent implements OnInit {

  listEmpresas: Empresas[] = [];

  constructor(
    private empresasSvc: EmpresasService
  ) { }

  ngOnInit(): void {
    this.empresasSvc.get().subscribe({
      next: res => this.listEmpresas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

}
