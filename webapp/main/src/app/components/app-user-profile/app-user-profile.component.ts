import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileModel } from 'userprofile';

@Component({
  selector: 'app-user-profile',
  templateUrl: './app-user-profile.component.html',
  styleUrls: ['./app-user-profile.component.scss']
})
export class AppUserProfileComponent implements OnInit {

  userId?: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId") || undefined;
    });
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
