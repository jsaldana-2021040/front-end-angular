import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Permisos } from '../interfaces/Permisos';
import { Paginado } from '../interfaces/paginado';

@Injectable({
  providedIn: 'root'
})
export class permisosService {

  url: string = 'http://localhost:5000/permisos'
  
  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<Permisos[]> {
    return this.http.get<Permisos[]>(this.url, { params: params }).pipe(
      first()
    );
  }

  getPg(params: HttpParams): Observable<Paginado<Permisos>> {
    return this.http.get<Paginado<Permisos>>(this.url + '/pg', { params: params }).pipe(
      first()
    );
  }

  post(body: Partial<Permisos>): Observable<Permisos> {
    return this.http.post<Permisos>(this.url, body).pipe(
      first()
    );
  }

  put(body: Partial<Permisos>, id: number): Observable<Permisos> {
    return this.http.put<Permisos>(this.url + `/${id}`, body).pipe(
      first()
    );
  }

  delete(id: number): Observable<Permisos> {
    return this.http.delete<Permisos>(this.url + `/${id}`).pipe(
      first()
    );
  }

  getId(id: number): Observable<Permisos> {
    return this.http.get<Permisos>(this.url + `/${id}`).pipe(
      first()
    );
  }
}
