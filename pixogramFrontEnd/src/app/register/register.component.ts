import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../auth.service';
import { Image } from '../models/Image';
import { MediaService } from '../media.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: String;
  firstname: String;
  lastname: String;
  email: String;
  file: File;
  password: String;
  submitted = false;
  registerForm: FormGroup;
  registerSuccess: boolean = false;
  uploadSuccess: boolean = false;
  uploadpic: Image;
  form: FormGroup;
  user: User;

  constructor(private mediaService: MediaService, private formBuilder: FormBuilder, private userService: UserService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    let user = new User(this.firstname, this.lastname, this.username, this.password, this.email);
    this.userService.createUser(user).subscribe(data => this.user = data, error => console.log(error));
    this.registerSuccess = true;
  }

  createForm() {
    this.form = this.formBuilder.group({
      file_upload: null
    });
  }

  upload() {
    let body = new FormData();
    body.append("file", this.file);
    this.mediaService.StoreProfile(body, this.user.id).subscribe(data => this.uploadpic = data);
    this.uploadSuccess = true;
    // this.authService.changeToLogin(this.user.id.toString(), this.user.username.toString(), this.user.email.toString(), this.user.firstname.toString());
  }

  fileChange(event: any) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
    }
  }

}
