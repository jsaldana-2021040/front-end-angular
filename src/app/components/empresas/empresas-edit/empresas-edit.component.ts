import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresas-edit',
  templateUrl: './empresas-edit.component.html',
  styles: [
  ]
})
export class EmpresasEditComponent implements OnInit {

  @Input() id: number = 0;

  enviandoDatos: boolean = false;

  empresa = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    direccion: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    telefono: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)]}),
    codigoPais: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  });

  constructor(
    private empresasSvc: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  showSuccess() {
    this.toastr.success('Editado con exito', 'Todo bien', {
      positionClass:"toast-bottom-right"
    });
  }

  ngOnInit(): void {
    this.empresasSvc.getId(this.id).subscribe({
      next: res => {
        let partesTelefono = res.telefono.split(' ');
        this.empresa.patchValue({
          nombre: res.nombre,
          direccion: res.direccion,
          telefono: partesTelefono[1],
          codigoPais: partesTelefono[0]
        });
      }, error: err => {
        this.enviandoDatos = false;
      }
    })
  }


  onSubmit(): void {
    let body = this.empresa.value;
    body.telefono = body.codigoPais! + ' ' +  body.telefono!;

    if (this.empresa.invalid) {
      this.enviandoDatos = false;
      return;
    }


    this.enviandoDatos = true;
    this.empresasSvc.put(body, this.id).subscribe({
      next: res => this.router.navigate(['../..'], { relativeTo: this.route }),
      error: err => {
        console.log('Error al insertar datos');
        this.enviandoDatos = false;
      },
      complete: () => this.showSuccess(),
    });
  }
}
