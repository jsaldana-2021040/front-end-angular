import { HttpParams } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  enviandoDatos: boolean = false;
  @Input() id: number = 0
  accion: string = ''

  rol = new FormGroup({
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
      next: res => { res.forEach(permiso => this.addFormPermiso(permiso)) },
      error: err => console.log('Error al obtener datos')
    });

    if (this.id == null) {
      this.accion = 'Agregar'
    } else {
      this.accion = 'Editar'
      this.rolesSvc.getId(this.id).subscribe({
        next: res => {
          console.log(res)
          this.rol.patchValue(res)
          res.rolesPermisos.map(permiso => {
            if (permiso.activo == true) {
              this.rol.controls.permisos.patchValue([{
                checked: 'true'
              }])
            }
          })
        },
        error: err => console.log('Error al obtener datos')
      });
    }
  }

  addFormPermiso(permiso: Permisos): void {
    this.rol.controls.permisos.push(new FormGroup({
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
      if (this.rol.invalid) {
        this.rol.markAllAsTouched();
        this.enviandoDatos = false;
        return;
      }

      let body = this.getBody();

      this.enviandoDatos = true;
      this.rolesSvc.post(body).subscribe({
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
      if (this.rol.invalid) {
        console.log('no se ingresaron todos los datos necesarios');
        this.enviandoDatos = false;
        return;
      }

      this.enviandoDatos = true;

      this.rolesSvc.put(this.rol.value, this.id).subscribe({
        next: res => this.router.navigate(['..'], { relativeTo: this.route }),
        error: err => {
          console.log('Error al insertar datos');
          this.enviandoDatos = false;
        }
      });
      this.showSuccess()
    }
  }

  getBody(): any {
    let listPermisos: number[] = [];
    this.rol.controls.permisos.controls.forEach(item => {
      if (item.controls.checked.value) {
        listPermisos.push(item.controls.permisoCod.value)
      }
    });

    return {
      nombre: this.rol.controls.nombre.value,
      descripcion: this.rol.controls.descripcion.value,
      permisos: listPermisos
    };
  }

  trimFormValue(control: string): void {
    let val = String(this.rol.get(control)?.value);
    this.rol.get(control)?.setValue(val.trim());
  }
}
