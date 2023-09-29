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

  obtenerColorTipo(tipe: string): string {
    switch (tipe) {
      case 'grass':
        return 'bg-gradient-to-b from-green-500 via-green-300 to-green-500'

      case 'poison':
        return 'bg-gradient-to-b from-purple-500 via-purple-300 to-purple-500'

      case 'fire':
        return 'bg-gradient-to-b from-red-500 via-red-300 to-red-500'

      case 'flying':
        return 'bg-gradient-to-b from-sky-500 via-sky-300 to-sky-500'

      case 'water':
        return 'bg-gradient-to-b from-blue-600 via-blue-400 to-blue-600'

      case 'bug':
        return 'bg-gradient-to-b from-lime-500 via-lime-300 to-lime-500'

      case 'dark':
        return 'bg-gradient-to-b from-slate-700 via-slate-500 to-slate-700 text-slate-50'

      case 'electric':
        return 'bg-gradient-to-b from-yellow-400 via-yellow-200 to-yellow-400'

      case 'fairy':
        return 'bg-gradient-to-b from-pink-400 via-pink-200 to-pink-400'

      case 'fighting':
        return 'bg-gradient-to-b from-yellow-800 via-amber-600 to-yellow-800'

      case 'steel':
        return 'bg-gradient-to-b from-gray-500 via-gray-300 to-gray-500'

      case 'ghost':
        return 'bg-gradient-to-b from-indigo-700 via-indigo-400 to-indigo-700'

      case 'ground':
        return 'bg-gradient-to-b from-yellow-600 via-yellow-400 to-yellow-600'

      case 'ice':
        return 'bg-gradient-to-b from-cyan-400 via-cyan-200 to-cyan-400'

      case 'normal':
        return 'bg-gradient-to-b from-neutral-400 via-neutral-300 to-neutral-400'

      case 'rock':
        return 'bg-gradient-to-b from-yellow-700 via-yellow-600 to-yellow-700'

      case 'psychic':
        return 'bg-gradient-to-b from-rose-400 via-rose-300 to-rose-400'

      case 'dragon':
        return 'bg-gradient-to-b from-violet-600 via-violet-400 to-violet-600'

      default:
        return ''
    }

  }

}
