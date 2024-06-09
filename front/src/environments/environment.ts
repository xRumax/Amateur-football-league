import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Environment {
  base_url: string = 'http://127.0.0.1:8000';
  registerUrl: string = 'http://127.0.0.1:8000/users/';

  constructor() {}
}
