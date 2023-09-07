import { Component, OnInit } from '@angular/core';
import { SystemService } from '../shared/services/system.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor (
    private systemSvc: SystemService
  ) { }
  
  ngOnInit(): void {
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.systemSvc.setStatusLoged(false);
  }

  changeTheme(): void {
    this.systemSvc.turnSystemTheme();
  }

  get isLoged() {
    return this.systemSvc.getStatusLoged();
  }
}
