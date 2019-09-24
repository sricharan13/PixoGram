import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../media.service'
import { Image } from '../models/Image';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { MediaData } from '../models/MediaData';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {

  form: FormGroup;
  file: File;
  imageToShow: any;
  myURL: any
  description: string;
  title: string;
  tags: string;
  uploadpic: Image;
  showForm: boolean = false;

  constructor(private fb: FormBuilder, private meadiaService: MediaService, private router: Router, private userService: UserService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      file_upload: null
    });
  }

  fileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  upload() {
    let body = new FormData();
    body.append("file", this.file);
    this.meadiaService.StoreMedia(body, this.userService.id).subscribe(data => this.uploadpic = data);
    this.showForm = true;
  }

  saveData() {
    let mdata = new MediaData(this.title, this.description, this.tags, this.uploadpic.id);
    this.meadiaService.StoreData(mdata, this.uploadpic.id).subscribe();
  }
}