import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-empresas-create',
  templateUrl: './empresas-create.component.html',
  styles: [
  ]
})

export class EmpresasCreateComponent {

  enviandoDatos: boolean = false;

  empresa = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    direccion: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    telefono: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(8)] }),
    codigoPais: new FormControl<string>('', { nonNullable: true, validators: Validators.required })
  });

  constructor(
    private empresasSvc: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  showSuccess() {
    this.toastr.success('Creado con exito', 'Todo bien', {
      positionClass:"toast-bottom-right", toastClass:"ngx-toastr  "
    });
  }

  onSubmit(): void {
    
    if (this.empresa.invalid) {
      this.empresa.markAllAsTouched();
      this.enviandoDatos = false;
      return;
    }

    let body = this.empresa.value;
    body.telefono = body.codigoPais! + ' ' +  body.telefono!;
    

    this.enviandoDatos = true;
    this.empresasSvc.post(body).subscribe({
      next: res => this.router.navigate(['..'], { relativeTo: this.route }),
      error: err => {
        this.enviandoDatos = false;
      },
      complete: () => this.showSuccess()
    });
  }

  trimFormValue(control: string): void {
    let val = String(this.empresa.get(control)?.value);
    this.empresa.get(control)?.setValue(val.trim());
  }
}
