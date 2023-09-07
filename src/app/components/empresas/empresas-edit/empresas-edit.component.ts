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
    telefono: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(8)] })
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
      next: res => this.empresa.patchValue(res),
      error: err => {
        console.log('Error al obtener la empresa');
        this.enviandoDatos = false;
      }
    })
  }


  onSubmit(): void {

    if (this.empresa.invalid) {
      console.log('no se ingresaron todos los datos necesarios');
      this.enviandoDatos = false;
      return;
    }

    this.enviandoDatos = true;
    this.empresasSvc.put(this.empresa.value, this.id).subscribe({
      next: res => this.router.navigate(['../..'], { relativeTo: this.route }),
      error: err => {
        console.log('Error al insertar datos');
        this.enviandoDatos = false;
      },
      complete: () => this.showSuccess(),
    });
  }
}
