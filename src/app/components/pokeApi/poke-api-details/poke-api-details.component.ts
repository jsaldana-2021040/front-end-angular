import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PokeData } from 'src/app/shared/interfaces/poke';
import { PokeHabilidades } from 'src/app/shared/interfaces/pokeHabilidades';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-details',
  templateUrl: './poke-api-details.component.html',
  styles: [
  ]
})
export class PokeApiDetailsComponent implements OnChanges {

  @Input() url: string | null = null;

  @Output() clicLista = new EventEmitter<boolean>();

  @Output() setMusica = new EventEmitter<any>();

  estadoInicio: boolean = true

  estadoMusica: boolean = false;

  musica = new Audio();

  data: PokeData | null = null;

  habPokemon = new PokeHabilidades

  imageSize: string = '60'

  constructor(
    private pokeSvc: pokeService,
  ) { }

  clicInicio(): void {
    this.clicLista.emit(true)
    this.estadoMusica = true

    this.musica.src = '../../../../assets/Lavender Town.mp3'

    this.musica.load()
    this.musica.play()

    this.musica.loop = true

    this.setMusica.emit(this.musica)
    this.estadoInicio = false
    this.imageSize = "90"
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pokeSvc.getByUrl(changes['url'].currentValue).subscribe({
      next: res => {
        this.data = res;
      }, error: err => console.log('Error al obtener datos')
    });
  }

  formatTxt(txt: string) {
    return this.pokeSvc.formatText(txt);
  }
  
  obtenerColorTipo(type: string): string {
    return this.pokeSvc.obtenerCssColorTipo(type);
  }

}
