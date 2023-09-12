import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SystemService } from '../services/system.service';

@Injectable({
  providedIn: 'root',
})

export class usuariosGuard {

  constructor(public systemSvc: SystemService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    
    let token = localStorage.getItem('token');
    let identity = JSON.parse(atob(token!.split('.')[1]));

    if (!this.systemSvc.getStatusLoged()()) {
      return false
    }
    if (identity['rol'] != 'ADMIN'){
      return false
    }
    return true
  }
}