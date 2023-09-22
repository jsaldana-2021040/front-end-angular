import { Component } from '@angular/core';
import { Poke } from 'src/app/shared/interfaces/poke';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-container',
  templateUrl: './poke-api-container.component.html',
  styles: [
  ]
})
export class PokeApiContainerComponent {

  dataPokemon = new Poke;

  constructor(
    private pokeSvc: pokeService,
  ) { }

  mostrarPokemon(url: string): void {
    console.log(url);
    
    this.pokeSvc.getByUrl(url).subscribe({
      next: res => this.dataPokemon = res,
      error: err => console.log('Error al obtener datos')
    });
  }

}
