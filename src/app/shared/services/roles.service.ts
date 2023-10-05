import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, first } from 'rxjs';
import { Roles } from '../interfaces/roles';
import { Paginado } from '../interfaces/paginado';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  url: string = 'http://localhost:5000/roles'
  
  constructor(
    private http: HttpClient
  ) { }

  get(params: HttpParams): Observable<Roles[]> {
    return this.http.get<Roles[]>(this.url, { params: params }).pipe(
      first()
    );
  }

  getPg(params: HttpParams): Observable<Paginado<Roles>> {
    return this.http.get<Paginado<Roles>>(this.url + '/pg', { params: params }).pipe(
      first()
    );
  }

  post(body: Partial<Roles>): Observable<Roles> {
    return this.http.post<Roles>(this.url, body).pipe(
      first()
    );
  }

  put(body: Partial<Roles>, id: number): Observable<Roles> {
    return this.http.put<Roles>(this.url + `/${id}`, body).pipe(
      first()
    );
  }

  delete(id: number): Observable<Roles> {
    return this.http.delete<Roles>(this.url + `/${id}`).pipe(
      first()
    );
  }

  getId(id: number): Observable<Roles> {
    return this.http.get<Roles>(this.url + `/${id}`).pipe(
      first()
    );
  }

}
