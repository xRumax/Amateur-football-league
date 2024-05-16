import { Injectable } from '@angular/core';
import axios from 'axios';
import { UserResponse } from '../section-page/profile/profile.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUser(userId: number): Promise<UserResponse> {
    return new Promise((resolve, reject) => {
      const token = sessionStorage.getItem('access_token'); // Get the token from sessionStorage
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
      const token = sessionStorage.getItem('access_token'); // Get the token from sessionStorage
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
}
