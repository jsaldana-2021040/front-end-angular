import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  private isLoged = signal(false);
  isDark: boolean = this.getDarkMode();

  constructor() { }

  initLoged(): void {
    const token = this.getToken();
    this.setStatusLoged((token != null));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setStatusLoged(val: boolean): void {
    this.isLoged.set(val);
  }

  getStatusLoged(): WritableSignal<boolean> {
    return this.isLoged;
  }

  setThemeMode(isDark: boolean): void {
    if (!isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.removeItem('mode')
    } else {
      localStorage.setItem('mode', 'dark')
      let modo = localStorage.getItem('mode')
      document.documentElement.classList.add(modo!);
    }
  }
  
  getDarkMode() : boolean{
    if (localStorage.getItem('mode')) {
      document.documentElement.classList.add('dark');
      return true;
    }
    return false
  }

}
