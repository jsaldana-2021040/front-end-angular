import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Modulos } from 'src/app/shared/interfaces/modulos';
import { modulosService } from 'src/app/shared/services/modulos.service';
import { permisosService } from 'src/app/shared/services/permisos.service';

@Component({
  selector: 'app-permisos-form',
  templateUrl: './permisos-form.component.html',
  styles: [
  ]
})
export class PermisosFormComponent implements OnInit {

  modulosList: Modulos[] = [];
  enviandoDatos: boolean = false;
  accion: string = ''
  @Input() id: number = 0

  form = new FormGroup({
    permiso: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    descripcion: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    moduloCod: new FormControl<number>(0, { nonNullable: true, validators: Validators.required }),
  });

  constructor(
    private permisosSvc: permisosService,
    private modulosSvc: modulosService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    let params = new HttpParams().append('activo', true);
    this.modulosSvc.get(params).subscribe({
      next: res => this.modulosList = res,
      error: err => console.log('Error al obtener datos')
    });

    if (this.id == null) {
      this.accion = 'Agregar'
    } else {
      this.accion = 'Editar'
      this.permisosSvc.getId(this.id).subscribe({
        next: res => this.form.patchValue(res),
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
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        this.enviandoDatos = false;
        return;
      }


      this.enviandoDatos = true;
      this.permisosSvc.post(this.form.value).subscribe({
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
      if (this.form.invalid) {
        console.log('no se ingresaron todos los datos necesarios');
        this.enviandoDatos = false;
        return;
      }

      this.enviandoDatos = true;

      this.permisosSvc.put(this.form.value, this.id).subscribe({
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
    let val = String(this.form.get(control)?.value);
    this.form.get(control)?.setValue(val.trim());
  }
}
