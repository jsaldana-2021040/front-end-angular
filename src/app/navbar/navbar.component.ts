import { Component, OnInit } from '@angular/core';
import { SystemService } from '../shared/services/system.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isDark = new FormControl(false, { nonNullable: true});

  constructor (
    private systemSvc: SystemService
  ) { }
  
  ngOnInit(): void {
    this.isDark.patchValue(this.systemSvc.getDarkMode());

    this.isDark.valueChanges.subscribe(val => this.systemSvc.setThemeMode(val));
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.systemSvc.setStatusLoged(false);
  }

  get isLoged() {
    return this.systemSvc.getStatusLoged();
  }
}
