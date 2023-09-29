import { Component, Input } from '@angular/core';
import { Paginado } from 'src/app/shared/interfaces/paginado';
import { Poke } from 'src/app/shared/interfaces/poke';

@Component({
  selector: 'app-poke-api-datos-list',
  templateUrl: './poke-api-datos-list.component.html',
  styles: [
  ]
})
export class PokeApiDatosListComponent {

  @Input() nombre = new String;

  @Input() id = new Number;
}
