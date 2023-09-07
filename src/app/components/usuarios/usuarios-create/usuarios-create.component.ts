import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Usuarios } from 'src/app/shared/interfaces/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-usuarios-create',
  templateUrl: './usuarios-create.component.html',
  styles: [
  ]
})
export class UsuariosCreateComponent implements OnInit {

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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.usuariosSvc.get().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.listUsuarios = res,
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

    this.suscripcion = this.usuariosSvc.post(this.usuario.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.router.navigate(['..'], { relativeTo: this.route }),
      error: err => {
        console.log('Error al insertar datos');
        this.enviandoDatos = false;
      }
    });
  }
}
