import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  constructor(private userService: UserService) { }

  users:Array<User>;
  followingList: User[];
  followersList: User[];

  follow(user:User) {
    this.userService.follow(this.userService.id, user.id).subscribe();
  }

  ngOnInit() {
    this.userService.getOtherUsers().subscribe(data => {this.users = data;});
    
    this.userService.followers(this.userService.id).subscribe(data => {this.followersList = data})

    this.userService.following(this.userService.id).subscribe(data => {this.followingList = data});
  }

}
