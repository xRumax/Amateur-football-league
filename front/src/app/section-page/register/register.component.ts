import { Component } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  register(): void {
    if (
      !this.username ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'All fields are required';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.registerService
      .register(this.username, this.email, this.password, this.confirmPassword)
      .then((response) => {
        this.snackBar.open('Zarejestrowano pomyślnie', '', {
          duration: 2000,
        });
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log('Registration failed', error);
        this.snackBar.open('Błąd rejestracji', '', {
          duration: 2000,
        });
      });
  }
}
