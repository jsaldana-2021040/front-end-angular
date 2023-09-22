import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Poke } from 'src/app/shared/interfaces/poke';
import { PokeHabilidades } from 'src/app/shared/interfaces/pokeHabilidades';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-list',
  templateUrl: './poke-api-list.component.html',
  styles: [
  ]
})
export class PokeApiListComponent implements OnInit {

  listPokemon = new Poke;

  dataPokemon = new Poke;

  estadoPokemon: boolean = false

  constructor(
    private pokeSvc: pokeService,
  ) { }

  ngOnInit(): void {
    this.cargarDatos()
  }

  cargarDatos() : void {
    this.pokeSvc.get().subscribe({
      next: res => this.listPokemon = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  cambiarPagina(url : string) : void {
    this.pokeSvc.getPg(url).subscribe({
      next: res => this.listPokemon = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  mostrarPokemon(url: string): void {
    this.estadoPokemon = true

    this.pokeSvc.getByUrl(url).subscribe({
      next: res => this.dataPokemon = res,
      error: err => console.log('Error al obtener datos')
    });
  }
}
