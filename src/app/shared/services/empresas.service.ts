import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Empresas } from '../interfaces/empresas';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
   
  url: string = 'http://localhost:5000/empresas'

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<Empresas[]> {
    return this.http.get<Empresas[]>(this.url).pipe(
      first()
    );
  }

  post(body: Partial<Empresas>): Observable<Empresas> {
    return this.http.post<Empresas>(this.url, body).pipe(
      first()
    );
  }

  put(body: Partial<Empresas>, id: number): Observable<Empresas> {
    return this.http.put<Empresas>(this.url + `/${id}`, body).pipe(
      first()
    );
  }

  delete(id: number): Observable<Empresas> {
    return this.http.delete<Empresas>(this.url + `/${id}`).pipe(
      first()
    );
  }

  getId(id: number): Observable<Empresas> {
    return this.http.get<Empresas>(this.url + `/${id}`).pipe(
      first()
    );
  }

}
