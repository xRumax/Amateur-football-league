import { Injectable } from '@angular/core';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormField } from '../components/form/form.component';

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  password: string;
  is_superuser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private snackBar: MatSnackBar) {}

  generateUserFields(user: UserResponse): FormField[] {
    return [
      {
        type: 'text',
        name: 'username',
        id: 'username',
        placeholder: 'Username',
        value: user.username,
      },
      {
        type: 'email',
        name: 'email',
        id: 'email',
        placeholder: 'Email',
        value: user.email,
      },
    ];
  }

  getUser(userId: number): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('access_token'); // Get the token from sessionStorage
      axios
        .get(`http://127.0.0.1:8000/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getAllUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get('http://127.0.0.1:8000/users/')
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getUserId(): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('access_token'); // Get the token from localStorage
      axios
        .get('http://127.0.0.1:8000/users/me/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  getUpdateForm(userId: number): Promise<FormField[]> {
    return axios
      .get(`http://127.0.0.1:8000/users/${userId}/`)
      .then((response) => {
        const userData = response.data.data;

        // Dynamiczne generowanie pól formularza
        return Object.keys(userData).map((key) => ({
          type: typeof userData[key] === 'number' ? 'number' : 'text',
          name: key,
          id: key,
          placeholder: `Podaj ${key}`,
          value: userData[key],
        }));
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        throw error;
      });
  }

  updateUser(userId: number, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('access_token');
      axios
        .put(`http://127.0.0.1:8000/users/${userId}/`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 5000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 500);
          resolve(response.data);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
          this.snackBar.open('Error updating user', 'Close', {
            duration: 5000,
          });
          reject(error);
        });
    });
  }
}
