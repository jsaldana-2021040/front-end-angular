import { Component, Input, OnInit } from '@angular/core';
import { PokeHabilidades } from 'src/app/shared/interfaces/pokeHabilidades';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-habilidades',
  templateUrl: './poke-api-habilidades.component.html',
  styles: [
  ]
})
export class PokeApiHabilidadesComponent implements OnInit {

  @Input() url: string | null = null;

  habPokemon = new PokeHabilidades

  constructor(
    private pokeSvc: pokeService,
  ) { }

  ngOnInit(): void {
    this.pokeSvc.getHab(this.url!).subscribe({
      next: res => this.habPokemon = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  formatTxt(txt: string) {
    return this.pokeSvc.formatText(txt);
  }

}
