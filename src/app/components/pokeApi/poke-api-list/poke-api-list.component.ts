import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { empty, filter, map } from 'rxjs';
import { Poke } from 'src/app/shared/interfaces/poke';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-list',
  templateUrl: './poke-api-list.component.html',
  styles: [
  ]
})
export class PokeApiListComponent implements OnInit {

  @Output() selectedPokemon = new EventEmitter<string>();

  pokemon = new FormControl<string>('', { nonNullable: true, validators: Validators.required })

  listPokemon = new Poke;

  estadoPokemon: boolean = false

  constructor(
    private pokeSvc: pokeService,
  ) { }

  ngOnInit(): void {
    this.cargarDatos()
  }

  validarPokemon(): void {
    if (this.pokemon.valid) {
      this.buscarPokemon()
    } else {
      this.cargarDatos()
    }
  }

  buscarPokemon(): void {
    let busqueda = this.pokemon.value.split(' ')

    this.pokeSvc.getAll().subscribe({
      next: res => {
        this.listPokemon = new Poke, res.results.map(item => {
          if (item.name.includes(busqueda.join('-'))) {
            this.listPokemon.results.push({
              name: item.name,
              url: item.url
            })
          }
        })
      },
    });
  }

  // buscarPokemon() : void {
  //   let busqueda = this.pokemon.value?.split(' ')

  //   this.pokeSvc.getAllByUrl().subscribe({
  //     next: res => res.results.map(item => { if (item.name == this.pokemon.value) {
  //       console.log(item);
  //     }
  //     }),
  //     error: err => console.log('Error al obtener datos')
  //   });
  // }

  cargarDatos(): void {
    this.pokeSvc.get().subscribe({
      next: res => this.listPokemon = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  cambiarPagina(url: string): void {
    this.pokeSvc.getPg(url).subscribe({
      next: res => this.listPokemon = res,
      error: err => console.log('Error al obtener datos')
    });
  }

  seleccionarPokemon(url: string): void {
    this.selectedPokemon.emit(url);
  }

}
