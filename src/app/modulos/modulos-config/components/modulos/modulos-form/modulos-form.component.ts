import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { modulosService } from 'src/app/shared/services/modulos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modulos-form',
  templateUrl: './modulos-form.component.html',
  styles: [
  ]
})

export class ModulosFormComponent implements OnInit {

  enviandoDatos: boolean = false;
  @Input() id: number = 0
  accion: string = ''

  modulo = new FormGroup({
    modulo: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    descripcion: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
  });

  constructor(
    private modulosSvc: modulosService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    if (this.id == null) {
      this.accion = 'Agregar'
    } else {
      this.accion = 'Editar'
      this.modulosSvc.getId(this.id).subscribe({
        next: res => this.modulo.patchValue(res),
        error: err => console.log('Error al obtener datos')
      });
    }
  }

  showSuccess() {
    this.toastr.success('', 'Todo bien', {
      positionClass: "toast-bottom-right", toastClass: "ngx-toastr  "
    });
  }

  onSubmit(): void {
    if (this.id == null) {
      if (this.modulo.invalid) {
        this.modulo.markAllAsTouched();
        this.enviandoDatos = false;
        return;
      }


      this.enviandoDatos = true;
      this.modulosSvc.post(this.modulo.value).subscribe({
        next: res => this.router.navigate(['..'], { relativeTo: this.route }),
        error: err => {
          this.enviandoDatos = false;
          this.toastr.error('Error', '', {
            positionClass: "toast-bottom-right", toastClass: "ngx-toastr  "
          });
        },
        complete: () => this.showSuccess()
      });
    } else {
      if (this.modulo.invalid) {
        console.log('no se ingresaron todos los datos necesarios');
        this.enviandoDatos = false;
        return;
      }

      this.enviandoDatos = true;

      this.modulosSvc.put(this.modulo.value, this.id).subscribe({
        next: res => this.router.navigate(['..'], { relativeTo: this.route }),
        error: err => {
          console.log('Error al insertar datos');
          this.enviandoDatos = false;
        }
      });
      this.showSuccess()
    }
  }

  trimFormValue(control: string): void {
    let val = String(this.modulo.get(control)?.value);
    this.modulo.get(control)?.setValue(val.trim());
  }
}
