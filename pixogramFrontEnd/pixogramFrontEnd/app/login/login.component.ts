import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { UserService } from '../user.service';

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

  constructor(private router: Router,public authService: AuthService,private userService: UserService) {

   }

  ngOnInit() {
    this.userService.getUsers().subscribe(response => this.users = response);
  }

  onLogin(){
    this.authService.changeToLogin();
  }
  onLogout(){
    this.authService.changeToLogout();
  }
  onLoginSubmit(){
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].username === this.username && this.users[i].password === this.password) {
        this.router.navigate(['LoggedInHome']);
        this.invalidLogin = false;
        localStorage.setItem("userId", this.users[i].id.toString());
        this.userService.firstName = this.users[i].firstname;
        this.onLogin();
      } 
      else {
        this.invalidLogin = true;
      }
    }
  }

}
