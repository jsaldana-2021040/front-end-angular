import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  
  private isLoged = signal(false);

  isDark: boolean = false;

  constructor() { }

  isLogedIn(): boolean {
    const token = this.getToken();
    return (token != null);
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

  turnSystemTheme(): void {
    if (this.isDark) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    this.isDark = !this.isDark
  }

}
