import { Injectable } from '@angular/core';
import { User } from './User';

const PASSWORD = 'test1234';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  public get loggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  login(email: string, password: string): User {
    // 1. Check if email is valid
    // Trying to regex email on the client is not useful relying on the
    // HTML element is fine
    // 2. Check if password is test1234
    if (password !== PASSWORD) {
      localStorage.setItem('token', null);
      return null;
    }
    // Set localstorage
    localStorage.setItem('token', `{ email: ${email}, cities: [] }`);
    return { email, cities: [] };
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
