import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Observable, catchError, first, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   
  url: string = 'http://localhost:5000/login'

  constructor(
    private http: HttpClient
  ) { }

  post(body: any): Observable<string> {
    return this.http.post<string>(this.url, body).pipe(
      first(),
      catchError((e) => {
        console.log(e)
        return throwError(e)
      })
    );
  }
}
