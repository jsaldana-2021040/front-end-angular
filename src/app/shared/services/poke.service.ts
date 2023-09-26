import { HttpClient } from "@angular/common/http"
import { Poke, PokeData } from "../interfaces/poke";
import { Observable, filter, first, map } from "rxjs";
import { Injectable } from "@angular/core";
import { PokeHabilidades } from "../interfaces/pokeHabilidades";

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

  getAll(): Observable<Poke> {
    return this.http.get<Poke>('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0').pipe(
      first(),
    )
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

  getPg(url: string): Observable<Poke> {
    return this.http.get<Poke>(url).pipe(
      first()
    );
  }
}