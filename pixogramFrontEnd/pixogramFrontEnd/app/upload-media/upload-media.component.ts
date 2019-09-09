import {  OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../media.service'
import { Media } from '../models/Media';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload-media',
  templateUrl: './upload-media.component.html',
  styleUrls: ['./upload-media.component.css']
})
export class UploadMediaComponent implements OnInit {

  form: FormGroup;
  file: File;

  constructor(private fb: FormBuilder, private http: HttpClient,private meadiaService: MediaService) { }
 
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
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

  upload() {
    let body = new FormData();
    body.append("file", this.file);
    this.meadiaService.StoreFile(body).subscribe((data) => {console.log(data)},
    error => console.log(error),() => { console.log("completed") }
    );   
  }
}