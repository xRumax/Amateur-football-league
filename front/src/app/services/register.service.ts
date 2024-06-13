import { Injectable } from '@angular/core';
import axios from 'axios';
import { Environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private envService: Environment) {}

  register(
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const user = { username, email, password, confirmPassword };
    return axios.post(this.envService.registerUrl, user);
  }
}
