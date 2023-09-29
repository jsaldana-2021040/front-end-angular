import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-container',
  templateUrl: './poke-api-container.component.html',
  styles: [
  ]
})
export class PokeApiContainerComponent {

  urlPokemon: string | null = null;

  estadoLista: boolean = false

  musica = new Audio()

}
