import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Media } from './models/Media';
import { MediaService } from './media.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  constructor(private router: Router, private userService: UserService, private mediaService: MediaService) { }
  

  changeToLogin(id: string, username: string, email: string, firstname: string) {
    localStorage.setItem("id", id);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("firstname", firstname);
    this.userService.firstname = localStorage.getItem("firstname");
    this.userService.username = localStorage.getItem("username");
    this.userService.id = JSON.parse(localStorage.getItem('id'));
    this.userService.email = localStorage.getItem("email");
    this.router.navigate(['/']);
  }

  changeToLogout() {
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("firstname");
    this.router.navigate(['/']);
  }

  isLoggedin() {
    return localStorage.getItem("id");
  }
}

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}