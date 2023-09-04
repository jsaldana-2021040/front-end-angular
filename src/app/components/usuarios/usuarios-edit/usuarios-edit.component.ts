import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-edit',
  templateUrl: './usuarios-edit.component.html',
  styles: [
  ]
})
export class UsuariosEditComponent {
  @Input() id: number = 0;

  listUsuarios: Usuarios[] = [];
  enviandoDatos: boolean = false;
  suscripcion: Subscription | null = null

  destroyRef = inject(DestroyRef)

  usuario = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email, Validators.minLength(10)], }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(8)] }),
  });

  constructor(
    private usuariosSvc: UsuariosService,
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
    this.usuariosSvc.getId(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.usuario.patchValue(res),
      error: err => console.log('Error al obtener datos')
    });
  }

  onSubmit(): void {

    if (this.usuario.invalid) {
      console.log('no se ingresaron todos los datos necesarios');
      this.enviandoDatos = false;
      return;
    }

    this.enviandoDatos = true;
    this.usuariosSvc.put(this.usuario.value, this.id).subscribe({
      next: res => this.router.navigate(['../..'], { relativeTo: this.route }),
      error: err => {
        console.log('Error al insertar datos');
        this.enviandoDatos = false;
      }
    });
  }
}
