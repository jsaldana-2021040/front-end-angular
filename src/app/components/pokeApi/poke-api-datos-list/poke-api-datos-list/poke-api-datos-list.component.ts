import { Component, Input } from '@angular/core';
import { Paginado } from 'src/app/shared/interfaces/paginado';
import { Poke } from 'src/app/shared/interfaces/poke';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-datos-list',
  templateUrl: './poke-api-datos-list.component.html',
  styles: [
  ]
})
export class PokeApiDatosListComponent {

  @Input() nombre = '';
  @Input() id = 0;

  constructor (
    private pokeSvc: pokeService
  ) { }

  formatTxt(txt: string) {
    return this.pokeSvc.formatText(txt);
  }
}
