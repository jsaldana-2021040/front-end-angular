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

  post(body: any): Observable<Empresas> {
    return this.http.post<Empresas>(this.url, body).pipe(
      first()
    );
  }

  getId(id: number): Observable<Empresas> {
    return this.http.get<Empresas>(this.url + `/${id}`).pipe(
      first()
    );
  }

}
