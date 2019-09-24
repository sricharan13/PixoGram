import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../auth.service';
import { Image } from '../models/Image';
import { MediaService } from '../media.service';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {

  password: string;
  repeatPassword: string;
  success: boolean=false;
  submitted = false;
  updateForm: FormGroup;
  form: FormGroup;
  file: File;
  imageToShow: any;
  uploadpic: Image;

  constructor(private mediaService: MediaService, private formBuilder: FormBuilder, public userService:UserService, private authService: AuthService, private router: Router) { }

  changePassword():void {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    this.userService.updateUser(this.password).subscribe();
    this.success = true;
  }

  ngOnInit() {
    this.createForm();
    this.updateForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  get f() { return this.updateForm.controls; }

  createForm() {
    this.form = this.formBuilder.group({
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
    this.mediaService.StoreProfile(body, this.userService.id).subscribe(data => this.uploadpic = data);
    this.router.navigate(["/MyMedia"]);
  }
}


