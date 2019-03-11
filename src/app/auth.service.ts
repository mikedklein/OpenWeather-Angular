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
    const user: User = {
      email
    };
    // Set localstorage
    localStorage.setItem('token', JSON.stringify(user));
    if (!localStorage.getItem(user.email)) {
      localStorage.setItem(
        user.email,
        JSON.stringify({ cities: [], units: 'imperial' })
      );
    }
    return user;
  }

  getUserData() {
    const user = JSON.parse(localStorage.getItem('token')).email;
    const userData = JSON.parse(localStorage.getItem(user));
    return userData;
  }

  setUserData(userData) {
    const user = JSON.parse(localStorage.getItem('token')).email;
    localStorage.setItem(user, JSON.stringify(userData));
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
