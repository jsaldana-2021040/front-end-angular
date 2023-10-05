import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  standalone: true,
  imports: [
    CommonModule,
  ]
})
export class FormErrorsComponent {

  @Input() control: FormControl = new FormControl();

}
