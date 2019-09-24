import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { Media } from '../models/Media';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LazyLoadImageModule, intersectionObserverPreset, LoadImageProps } from 'ng-lazyload-image';

@Component({
  selector: 'app-my-media',
  templateUrl: './my-media.component.html',
  styleUrls: ['./my-media.component.css']
})
export class MyMediaComponent implements OnInit {
  src: Media[];
  public images: any = [];
  srcString: String;

  constructor(private mediaService: MediaService ,private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.mediaService.getUserMedia(JSON.parse(localStorage.getItem("id"))).subscribe(response => this.src = response);
  }

  reload() {
    window.location.reload();
  }

}
