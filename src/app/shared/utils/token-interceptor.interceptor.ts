import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemService } from '../services/system.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private systemSvc: SystemService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.systemSvc.getStatusLoged()()) {
      const token = this.systemSvc.getToken();
      const cloned = request.clone({headers: request.headers.set('Authorization', 'Bearer '+ token??'')});
      return next.handle(cloned);
    }
    return next.handle(request);
  }
}
