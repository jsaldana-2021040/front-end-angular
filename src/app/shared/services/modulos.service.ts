import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Modulos } from '../interfaces/modulos';
import { Paginado } from '../interfaces/paginado';

@Injectable({
  providedIn: 'root'
})
export class modulosService {

  url: string = 'http://localhost:5000/modulos'
  
  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<Modulos[]> {
    return this.http.get<Modulos[]>(this.url, { params: params }).pipe(
      first()
    );
  }

  getPg(params: HttpParams): Observable<Paginado<Modulos>> {
    return this.http.get<Paginado<Modulos>>(this.url + '/pg', { params: params }).pipe(
      first()
    );
  }

  post(body: Partial<Modulos>): Observable<Modulos> {
    return this.http.post<Modulos>(this.url, body).pipe(
      first()
    );
  }

  put(body: Partial<Modulos>, id: number): Observable<Modulos> {
    return this.http.put<Modulos>(this.url + `/${id}`, body).pipe(
      first()
    );
  }

  delete(id: number): Observable<Modulos> {
    return this.http.delete<Modulos>(this.url + `/${id}`).pipe(
      first()
    );
  }

  getId(id: number): Observable<Modulos> {
    return this.http.get<Modulos>(this.url + `/${id}`).pipe(
      first()
    );
  }
}
