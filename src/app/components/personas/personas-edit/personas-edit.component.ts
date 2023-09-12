import { Component, DestroyRef, Input, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresas } from 'src/app/shared/interfaces/empresas';
import { EmpresasService } from 'src/app/shared/services/empresas.service';
import { PersonasService } from 'src/app/shared/services/personas.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-personas-edit',
  templateUrl: './personas-edit.component.html',
  styles: [
  ]
})
export class PersonasEditComponent {

  @Input() id: number = 0;
  
  listEmpresas: Empresas[] = [];
  enviandoDatos: boolean = false;
  suscripcion: Subscription | null = null

  destroyRef = inject(DestroyRef)

  persona = new FormGroup({
    nombres: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(100), Validators.minLength(3)] }),
    apellidos: new FormControl<string>('', { nonNullable: true, validators: Validators.required }),
    tieneVisa: new FormControl<boolean>(false, { nonNullable: true }),
    empresaCod: new FormControl<number | undefined >(undefined, { nonNullable: true, validators: Validators.required })
  });

  constructor(
    private personasSvc: PersonasService,
    private empresasSvc: EmpresasService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  showSuccess() {
    this.toastr.success('Editado con exito', 'Todo bien', {
      positionClass:"toast-bottom-right"
    });
  }

  ngOnInit(): void {
    let params = new HttpParams()
    this.empresasSvc.get(params).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.listEmpresas = res,
      error: err => console.log('Error al obtener datos')
    });

    this.personasSvc.getId(this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.persona.patchValue(res),
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

    this.suscripcion = this.personasSvc.put(this.persona.value, this.id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: res => this.router.navigate(['../..'], { relativeTo: this.route }),
      error: err => {
        console.log('Error al insertar datos');
        this.enviandoDatos = false;
      }
    });
    this.showSuccess()
  }
}
