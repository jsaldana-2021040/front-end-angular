import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { SystemService } from 'src/app/shared/services/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})

export class LoginComponent {

  enviandoDatos: boolean = false;
  suscripcion: Subscription | null = null
  destroyRef = inject(DestroyRef)

  constructor(
    private loginSvc: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private systemSvc: SystemService
  ) { }

  form = new FormGroup({
    email: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.email, Validators.minLength(10)], }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(8)] }),
  });

  showSucces() {
    this.toastr.success('Inicio de sesion exitoso', 'Todo bien', {
      positionClass: "toast-bottom-right"
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Error', {
      positionClass: "toast-bottom-right"
    });
  }

  onSubmit(): void {
    this.enviandoDatos = true;
    this.suscripcion = this.loginSvc.post(this.form.value)
      .pipe(
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next: res => {
          localStorage.setItem('token', res)
          this.systemSvc.setStatusLoged(true);
          this.router.navigate(['']);
        },
        error: err => {
          this.showError(err.error.message)
          this.enviandoDatos = false;
        },
        complete: () => this.showSucces()
      });
  }
}
