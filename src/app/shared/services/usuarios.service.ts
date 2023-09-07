import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Usuarios } from '../interfaces/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
   
  url: string = 'http://localhost:5000/usuarios'

  headers = { 'Authorization': 'Bearer '+ localStorage.getItem('token')}

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Usuarios[]> {
    return this.http.get<Usuarios[]>(this.url, {headers: this.headers}).pipe(
      first()
    );
  }

  post(body: any): Observable<Usuarios> {
    return this.http.post<Usuarios>(this.url, body, {headers: this.headers}).pipe(
      first()
    );
  }

  put(body: Partial<Usuarios>, id: number): Observable<Usuarios> {
    return this.http.put<Usuarios>(this.url + `/${id}`, body, {headers: this.headers}).pipe(
      first()
    );
  }

  delete(id: number): Observable<Usuarios> {
    return this.http.delete<Usuarios>(this.url + `/${id}`, {headers: this.headers}).pipe(
      first()
    );
  }

  getId(id: number): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.url + `/${id}`).pipe(
      first()
    );
  }

}
