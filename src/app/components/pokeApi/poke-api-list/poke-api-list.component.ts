import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Paginado } from 'src/app/shared/interfaces/paginado';
import { Poke } from 'src/app/shared/interfaces/poke';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-list',
  templateUrl: './poke-api-list.component.html',
  styles: [
  ]
})
export class PokeApiListComponent implements OnInit {

  @Input() musica = new Audio()

  @Output() selectedPokemon = new EventEmitter<string>();

  pokemon = new FormControl<string>('', { nonNullable: true, validators: Validators.required })

  elegirMusica = new FormControl<string>('Lavender Town')

  estadoRepro: boolean = false;

  estadoBusqueda: boolean = false

  estado: string = 'pause';

  listPokemon = new Paginado<Poke>;

  estadoPokemon: boolean = false

  constructor(
    private pokeSvc: pokeService,
  ) { }

  ngOnInit(): void {
    this.cargarDatos(1)
    this.pokemon.valueChanges.subscribe(() => this.cargarDatos(1));
    this.elegirMusica.valueChanges.subscribe(() => this.changeMusic());
  }

  changeMusic(): void {
    this.musica.src = '../../../../assets/' + this.elegirMusica.value + '.mp3'
    this.musica.play()
    this.estadoRepro = false
    this.estado = 'pause'
    this.musica.loop = true
  }

  clicPause(): void {
    if (this.estadoRepro == false) {
      this.musica.pause()
      this.estadoRepro = true

      this.estado = 'play'
    } else if (this.estadoRepro == true) {
      this.musica.play()
      this.estadoRepro = false

      this.estado = 'pause'
    }
  }

  volverArriba(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  cargarDatos(pagina: number): void {
    let busqueda = this.pokemon.value.split(' ')
    let params = new HttpParams().append('pagina', pagina).append('nombre', busqueda.join('-'));

    this.pokeSvc.getPg(params).subscribe({
      next: res => {
        this.listPokemon = res
        if (this.listPokemon.items.length < 1) {
          this.estadoBusqueda = true
        } else {
          this.estadoBusqueda = false
        }
      },
      error: err => console.log('Error al obtener datos')
    });
  }

  upperCase(x: string) {

    let palabra = x.split('-')

    return palabra.join(' ').charAt(0).toUpperCase() + palabra.join(' ').slice(1);
  }

  seleccionarPokemon(url: string): void {
    this.selectedPokemon.emit(url);
  }

  getId(url: string): number {
    let split: string[] = url.split('/');
    return Number(split[6]);
  }

}
