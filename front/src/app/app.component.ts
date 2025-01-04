import { Component } from '@angular/core';
import { Router } from '@angular/router';

export interface FormField {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  value: string | number | boolean | (string | number)[];
  options?: { label: string; value: number | string }[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
