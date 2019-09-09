import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedin = false;
  constructor() { }
  changeToLogin() {
    this.isLoggedin = true;

  }
  changeToLogout() {
    this.isLoggedin = false;
  }

}
