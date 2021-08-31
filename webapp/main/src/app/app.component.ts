import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcAuthService } from 'auth-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pretty Useless Webapp';
  links = ['Blog Posts', 'Bookmarks'];
  userProfile: any;

  constructor(private router: Router, private authService: OidcAuthService) {
    this.authService.userSubject
      .subscribe(profile => {
        this.userProfile = profile;
      });
  }

  get userId(): string { return this.userProfile?.sub; }
  get userName(): string { return this.userProfile?.name; }

  userPosts() : void {
    this.router.navigate(['user', this.userId, 'posts'], 
    { 
      state: { "endpoint": `users/${this.userId}/posts` }
    });
  }
}
