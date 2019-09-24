import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MediaService } from '../media.service';
import { Media } from '../models/Media';

@Component({
  selector: 'app-login-home',
  templateUrl: './login-home.component.html',
  styleUrls: ['./login-home.component.css']
})
export class LoginHomeComponent implements OnInit {

  constructor(private mediaService: MediaService, private authService: AuthService, private router: Router, public userService: UserService) { }

  profile: Media[];

  ngOnInit() {
      this.mediaService.getProfilePic().subscribe(response => this.profile = response);
  }

}
