import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { Permisos } from 'src/app/shared/interfaces/Permisos';
import { permisosService } from 'src/app/shared/services/permisos.service';
import { RolesService } from 'src/app/shared/services/roles.service';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styles: [
  ]
})
export class RolesFormComponent {

  @Input() id: number = 0
  enviandoDatos: boolean = false;

  form = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    descripcion: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    permisos: new FormArray<FormGroup<{
      permisoCod: FormControl,
      permiso: FormControl,
      checked: FormControl
    }>>([])
  });

  constructor(
    private rolesSvc: RolesService,
    private permisosSvc: permisosService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let params = new HttpParams().append('activo', true);

    this.permisosSvc.get(params).subscribe({
      next: res => {
        res.forEach(permiso => this.addFormPermiso(permiso));
        this.cargaDatos();
      }, error: err => console.log('Error al obtener datos')
    });
  }
  
  cargaDatos(): void {
    if (this.id == null) {
      return
    }

    this.rolesSvc.getId(this.id).subscribe({
      next: res => {
        this.form.patchValue(res);
        res.rolesPermisos.forEach(permiso => {
          if (permiso.activo == true) {
            this.form.controls.permisos.controls.forEach(datos => {
              if (permiso.permisosCod == datos.controls.permisoCod.value) {
                datos.controls.checked.setValue(true);
              }
            });
          }
        });
      }, error: err => console.log('Error al obtener datos')
    });
  }

  addFormPermiso(permiso: Permisos): void {
    this.form.controls.permisos.push(new FormGroup({
      permisoCod: new FormControl<number>(permiso.codPermiso, { nonNullable: false, validators: [Validators.required] }),
      permiso: new FormControl<string>(permiso.permiso, { nonNullable: false, validators: [Validators.required] }),
      checked: new FormControl<boolean>(false, { nonNullable: false, validators: [Validators.required] })
    }));
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

      let body = this.getBody();

      this.enviandoDatos = true;
      this.rolesSvc.post(body).subscribe({
        next: () => this.router.navigate(['..'], { relativeTo: this.route }),
        error: () => {
          this.enviandoDatos = false;
          this.toastr.error('Error', '', {
            positionClass: "toast-bottom-right", toastClass: "ngx-toastr  "
          });
        },
        complete: () => this.showSuccess()
      });
    } else {
      if (this.form.invalid) {
        this.enviandoDatos = false;
        return;
      }

      this.enviandoDatos = true;

      this.rolesSvc.put(this.getBody(), this.id).subscribe({
        next: () => this.router.navigate(['..'], { relativeTo: this.route }),
        error: () => {
          this.enviandoDatos = false;
          this.toastr.error('Error', '', {
            positionClass: "toast-bottom-right", toastClass: "ngx-toastr  "
          });
        },
        complete: () => this.showSuccess()
      });
    }
  }

  getBody(): any {
    let listPermisos: number[] = [];
    this.form.controls.permisos.controls.forEach(item => {
      if (item.controls.checked.value) {
        listPermisos.push(item.controls.permisoCod.value)
      }
    });

    return {
      nombre: this.form.controls.nombre.value,
      descripcion: this.form.controls.descripcion.value,
      permisos: listPermisos
    };
  }

  trimFormValue(control: string): void {
    let val = String(this.form.get(control)?.value);
    this.form.get(control)?.setValue(val.trim());
  }
}
