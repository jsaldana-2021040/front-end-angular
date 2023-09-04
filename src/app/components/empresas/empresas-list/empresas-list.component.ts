import { Component, Input, OnInit } from '@angular/core';
import { Empresas } from 'src/app/shared/interfaces/empresas';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styles: [
  ]
})
export class EmpresasListComponent implements OnInit {

  @Input() id: number = 0;

  listEmpresas: Empresas[] = [];

  constructor(
    private empresasSvc: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  showSuccess() {
    this.toastr.success('Eliminado con exito', 'Todo bien', {
      positionClass:"toast-bottom-right"
    });
  }

  ngOnInit(): void {
    this.empresasSvc.get().subscribe({
      next: res => this.listEmpresas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  cargar() : void{
    this.empresasSvc.get().subscribe({
      next: res => this.listEmpresas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  delete( id: number) : void{
    this.empresasSvc.delete(id).subscribe({
      next: res => {this.cargar()},
      error: err => {
        console.log('Error al insertar datos');
      }
    });
    this.showSuccess()
  }

  navegarAgregar(): void {
    this.router.navigate(['agregar'], { relativeTo: this.route })
  }

}
