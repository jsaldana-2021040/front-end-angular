import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Poke } from 'src/app/shared/interfaces/poke';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-container',
  templateUrl: './poke-api-container.component.html',
  styles: [
  ]
})
export class PokeApiContainerComponent {

  urlPokemon: string | null = null;

  constructor(
    private pokeSvc: pokeService,
  ) { }

}
