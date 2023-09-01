import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styles: [
  ]
})
export class FormErrorsComponent {

  @Input() formControl: FormControl | null = null;

}
