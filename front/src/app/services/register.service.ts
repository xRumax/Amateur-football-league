import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private registerUrl = 'http://127.0.0.1:8000/users/';

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const user = { username, email, password, confirmPassword };
    return axios.post(this.registerUrl, user);
  }
}
