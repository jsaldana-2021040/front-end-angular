import { HttpClient } from "@angular/common/http"
import { Poke } from "../interfaces/poke";
import { Observable, first } from "rxjs";
import { Paginado } from "../interfaces/paginado";
import { Injectable } from "@angular/core";
import { PokeDataPreview } from "../interfaces/pokeDataPreview";

@Injectable({
  providedIn: 'root'
})

export class pokeService {
  url : string ="https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"

  urlById : string ="https://pokeapi.co/api/v2/pokemon"

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Poke> {
    return this.http.get<Poke>(this.url).pipe(
      first()
    );
  }

  getById(nombre : string): Observable<PokeDataPreview> {
    return this.http.get<PokeDataPreview>(this.urlById + `/${nombre}`).pipe(
      first()
    );
  }

  getPg(): Observable<Paginado<Poke>> {
    return this.http.get<Paginado<Poke>>(this.url + '/pg').pipe(
      first()
    );
  }
}