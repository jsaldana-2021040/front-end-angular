import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login = false

  token = localStorage.getItem('token')
  
  ngOnInit(): void {
    if (this.token != null) {
      this.login = true
    }
  }

  logOut(): void {
    localStorage.removeItem('token');
  }
}
