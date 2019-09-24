import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/User';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

  users:Array<User>;
  followingList: User[];
  followersList: User[];

  ngOnInit() {
    this.userService.getOtherUsers().subscribe(data => {this.users = data;});
  }

  follow(user: User) {
    this.userService.follow(this.userService.id, user.id).subscribe();
    window.location.reload();
  }

  unfollow(fid: number) {
    this.userService.unfollow(this.userService.id, fid).subscribe();
    window.location.reload();
  }

  block(user: User) {
    this.userService.block(user.id).subscribe();
    window.location.reload();
  }

  getFollowers() {
    this.userService.followers(this.userService.id).subscribe(data => {this.followersList = data});
  }

  getFollowing() {
    this.userService.following(this.userService.id).subscribe(data => {this.followingList = data});
  }

  viewProfile(user: User) {
    this.userService.viewProfile(user.id.toString());
    this.router.navigate(['/MediaDetail']);
  }

}
