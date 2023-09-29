import { HttpClient, HttpParams } from "@angular/common/http"
import { Poke, PokeData } from "../interfaces/poke";
import { Observable, filter, first, map } from "rxjs";
import { Injectable } from "@angular/core";
import { PokeHabilidades } from "../interfaces/pokeHabilidades";
import { Paginado } from "../interfaces/paginado";

@Injectable({
  providedIn: 'root'
})

export class pokeService {
  url: string = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0"

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Poke> {
    return this.http.get<Poke>(this.url).pipe(
      first(),
    );
  }

  getByUrl(url: string): Observable<PokeData> {
    return this.http.get<PokeData>(url).pipe(
      first()
    );
  }

  getHab(url: string): Observable<PokeHabilidades> {
    return this.http.get<PokeHabilidades>(url).pipe(
      first()
    );
  }

  getPg(params: HttpParams): Observable<Paginado<Poke>> {
    return this.http.get<Paginado<Poke>>('http://localhost:5000/pokemons/pg', { params: params }).pipe(
      first()
    );
  }
}