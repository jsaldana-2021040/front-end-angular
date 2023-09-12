import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';
import { Paginado } from '../interfaces/paginado';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
   
  url: string = 'http://localhost:5000/usuarios'


  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.url, { params: params }).pipe(
      first()
    );
  }

  getpg(params: HttpParams): Observable<Paginado<Usuarios>> {
    return this.http.get<Paginado<Usuarios>>(this.url + '/pg', { params: params }).pipe(
      first()
    );
  }

  post(body: any): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.url, body).pipe(
      first()
    );
  }

  put(body: Partial<Usuarios>, id: number): Observable<Usuarios> {
    return this.http.put<Usuarios>(this.url + `/${id}`, body).pipe(
      first()
    );
  }

  delete(id: number): Observable<Usuarios> {
    return this.http.delete<Usuarios>(this.url + `/${id}`).pipe(
      first()
    );
  }

  getId(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.url + `/${id}`).pipe(
      first()
    );
  }

}
