import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresasService } from 'src/app/shared/services/empresas.service';

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
    telefono: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.pattern("^[0-9]*$"), Validators.maxLength(8)] })
  });

  constructor(
    private empresasSvc: EmpresasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  onSubmit(): void {

    if (this.empresa.invalid) {
      console.log('no se ingresaron todos los datos necesarios');
      this.enviandoDatos = false;
      return;
    }

    this.enviandoDatos = true;
    this.empresasSvc.post(this.empresa.value).subscribe({
      next: res => this.router.navigate(['..'], { relativeTo: this.route }),
      error: err => {
        console.log('Error al insertar datos');
        this.enviandoDatos = false;
      }
    });
  }
}
