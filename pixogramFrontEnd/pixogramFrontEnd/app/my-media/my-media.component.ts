import { Component, OnInit } from '@angular/core';
import { MediaService } from '../media.service';
import { Media } from '../models/Media';
import { DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../user.service';

@Component({
  selector: 'app-my-media',
  templateUrl: './my-media.component.html',
  styleUrls: ['./my-media.component.css']
})
export class MyMediaComponent implements OnInit {
  src: Media[];

  constructor(private sanitizer:DomSanitizer ,private mediaService: MediaService ,private userService: UserService) { }

  sanitize(url:string) {
    return this.sanitizer.bypassSecurityTrustUrl(url); 
  }

  ngOnInit() {
    this.mediaService.getCustomerImages(this.userService.id).subscribe(response => this.src = response);
  }

}
