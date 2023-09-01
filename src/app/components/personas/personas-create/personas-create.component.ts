import { Component, DestroyRef, OnDestroy, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { Empresas } from 'src/app/shared/interfaces/empresas';
import { Subscription} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-personas-create',
  templateUrl: './personas-create.component.html',
  styles: [
  ]
})

export class PersonasCreateComponent implements OnInit {

  listEmpresas: Empresas[] = [];
  enviandoDatos: boolean = false;
  suscripcion: Subscription | null = null

  destroyRef = inject(DestroyRef)

  persona = new FormGroup({
    nombres: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100), Validators.minLength(3)] }),
    apellidos: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    tieneVisa: new FormControl<boolean>(false, { nonNullable: true }),
    empresaCod: new FormControl<number | null>(null, { nonNullable: true, validators: Validators.required })
  });

  constructor(
    private personasSvc: PersonasService,
    private empresasSvc: EmpresasService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.empresasSvc.get().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.listEmpresas = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  onSubmit(): void {
    if (this.persona.invalid) {
      console.log('no se ingresaron todos los datos necesarios');
      this.enviandoDatos = false;
      return;
    }

    this.enviandoDatos = true;

    this.suscripcion = this.personasSvc.post(this.persona.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.router.navigate(['..'], { relativeTo: this.route }),
      error: err => {
        console.log('Error al insertar datos');
        this.enviandoDatos = false;
      }
    });

  }
}
