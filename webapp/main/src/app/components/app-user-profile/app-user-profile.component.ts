import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileModel } from 'userprofile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './app-user-profile.component.html',
  styleUrls: ['./app-user-profile.component.scss']
})
export class AppUserProfileComponent implements OnInit {

  constructor(
    private router: Router) 
  { }

  ngOnInit(): void {
  }

  userPosts(item: UserProfileModel) : void {
    this.router.navigate(['users', item.id, 'posts'],
    {
      state: { "endpoint": `users/${item.id}/posts`, userId: item.id }
    });
  }

  editUserProfile(item: UserProfileModel) : void {
    this.router.navigate(['users', 'edit', item.id]);
  }
}
