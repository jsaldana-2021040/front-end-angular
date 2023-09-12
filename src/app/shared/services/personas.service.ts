import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Personas } from '../interfaces/personas';
import { Paginado } from '../interfaces/paginado';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
   
  url: string = 'http://localhost:5000/personas'

  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<Personas[]> {
    return this.http.get<Personas[]>(this.url, { params: params }).pipe(
      first()
    );
  }

  getpg(params: HttpParams): Observable<Paginado<Personas>> {
    return this.http.get<Paginado<Personas>>(this.url + '/pg', { params: params }).pipe(
      first()
    );
  }

  post(body: any): Observable<Personas> {
    return this.http.post<Personas>(this.url, body).pipe(
      first()
    );
  }

  put(body: Partial<Personas>, id: number): Observable<Personas> {
    return this.http.put<Personas>(this.url + `/${id}`, body).pipe(
      first()
    );
  }

  delete(id: number): Observable<Personas> {
    return this.http.delete<Personas>(this.url + `/${id}`).pipe(
      first()
    );
  }

  getId(id: number): Observable<Personas> {
    return this.http.get<Personas>(this.url + `/${id}`).pipe(
      first()
    );
  }

}
