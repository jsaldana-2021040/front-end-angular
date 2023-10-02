import { Component, Input, OnInit } from '@angular/core';
import { PokeHabilidades } from 'src/app/shared/interfaces/pokeHabilidades';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-ataques',
  templateUrl: './poke-api-ataques.component.html',
  styles: [
  ]
})
export class PokeApiAtaquesComponent implements OnInit {

  @Input() url: string | null = null;

  ataquesPokemon = new PokeHabilidades

  constructor(
    private pokeSvc: pokeService,
  ) { }

  ngOnInit(): void {
    this.pokeSvc.getHab(this.url!).subscribe({
      next: res => {
        this.ataquesPokemon = res
      }, error: err => console.log('Error al obtener datos')
    });
  }

  upperCase(x: string) {

    let palabra = x.split('-')

    return palabra.join(' ').charAt(0).toUpperCase() + palabra.join(' ').slice(1);
  }

  obtenerColorTipo(type: string): string {
    return this.pokeSvc.obtenerCssColorTipo(type);
  }

}
