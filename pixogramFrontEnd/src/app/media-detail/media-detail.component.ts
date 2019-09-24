import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { MediaService } from '../media.service';
import { Media } from '../models/Media';

@Component({
  selector: 'app-media-detail',
  templateUrl: './media-detail.component.html',
  styleUrls: ['./media-detail.component.css']
})

export class MediaDetailComponent implements OnInit {
  src: Media[];
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private mediaService: MediaService) { }

  ngOnInit() {
    this.mediaService.getUserMedia(JSON.parse(localStorage.getItem("viewProfileId"))).subscribe(response => this.src = response);
  }
}
