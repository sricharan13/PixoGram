import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  invalidLogin: boolean = false;
  users: User[];
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,public authService: AuthService,private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(response => this.users = response);
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    } );
  }

  get f() { return this.loginForm.controls; }

  onLogin(id: string, username: string, email: string, firstname: string) {
    this.authService.changeToLogin(id, username, email, firstname);
  }

  onLogout() {
    this.authService.changeToLogout();
  }

  onLoginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.username && this.users[i].password === this.password) {
        this.onLogin(this.users[i].id.toString(), this.users[i].username.toString(), this.users[i].email.toString(), this.users[i].firstname.toString());
      } 
      else {
        this.invalidLogin = true;
      }
    }
  }

}
