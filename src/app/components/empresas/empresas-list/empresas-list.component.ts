import { Component, Input, OnInit } from '@angular/core';
import { Empresas } from 'src/app/shared/interfaces/empresas';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-empresas-list',
  templateUrl: './empresas-list.component.html',
  styles: [
  ]
})
export class EmpresasListComponent implements OnInit {

  listEmpresas: Empresas[] = [];

  filtros = new FormGroup({
    nombre: new FormControl<string | null>(''),
    direccion: new FormControl<string | null>(''),
    telefono: new FormControl<string | null>(''),
    activo: new FormControl<boolean | null>(true),
  });

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
    this.cargar();
  }

  cargar() : void{
    let params = new HttpParams();
    
    for (const key in this.filtros.controls) {

      let values = this.filtros.get(key)!.value 
      
      if (values != null) {
        values = String(this.filtros.get(key)!.value)
      }

      console.log(values);
      
      if (values) {        
        params = params.append(key, this.filtros.get(key)!.value)  
      }
    }

    this.empresasSvc.get(params).subscribe({
      next: res => this.listEmpresas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  delete(id: number) : void{
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
