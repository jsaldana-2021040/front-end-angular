import { Component, OnInit } from '@angular/core';
import { SystemService } from './shared/services/system.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'frontend';

  constructor (
    private systemSvc: SystemService
  ) { }

  ngOnInit(): void {
    this.systemSvc.initLoged();
  }
}

