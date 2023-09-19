import { Component, OnInit } from '@angular/core';
import { Paginado } from 'src/app/shared/interfaces/paginado';
import { Poke } from 'src/app/shared/interfaces/poke';
import { PokeDataPreview } from 'src/app/shared/interfaces/pokeDataPreview';
import { pokeService } from 'src/app/shared/services/poke.service';

@Component({
  selector: 'app-poke-api-list',
  templateUrl: './poke-api-list.component.html',
  styles: [
  ]
})
export class PokeApiListComponent implements OnInit {

  listPokemon = new Poke;

  dataPokemon = new PokeDataPreview;

  estadoPokemon: boolean = false

  constructor(
    private pokeSvc: pokeService,
  ) { }

  mostrarPokemon(nombre: string): void {
    this.estadoPokemon = true

    this.pokeSvc.getById(nombre).subscribe({
      next: res => {
        this.dataPokemon = res;
      },
      error: err => console.log('Error al obtener datos')
    });
  }

  // setTipo(tipo : string): void {
  //   switch (tipo) {
  //     case 'normal' : {
  //       this.tipo = 'bg-red-500'
  //       break;
  //     }
  //     default: {
  //       //statements; 
  //       break;
  //     }
  //   }
  // }

  ngOnInit(): void {
    this.pokeSvc.get().subscribe({
      next: res => {this.listPokemon = res, console.log(res);
      },
      error: err => console.log('Error al obtener datos')
    });
  }
}
