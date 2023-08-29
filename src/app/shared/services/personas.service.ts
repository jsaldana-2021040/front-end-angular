import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Personas } from '../interfaces/personas';

@Injectable({
  providedIn: 'root'
})
export class personasService {
   
  url: string = 'http://localhost:5000/personas'

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Personas[]> {
    return this.http.get<Personas[]>(this.url).pipe(
      first()
    );
  }

  post(body: any): Observable<Personas> {
    return this.http.post<Personas>(this.url, body).pipe(
      first()
    );
  }

  getId(id: number): Observable<Personas> {
    return this.http.get<Personas>(this.url + `/${id}`).pipe(
      first()
    );
  }

}
