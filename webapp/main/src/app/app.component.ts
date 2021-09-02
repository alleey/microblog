import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcAuthService } from 'auth-oidc';
import { TopicModel } from 'projects/blog/src/public-api';
import { BookmarkModel } from 'projects/bookmarks/src/public-api';

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

  navigateBookmark(bookmark: BookmarkModel): void {
    console.info(`Navigate to ${bookmark.url}`)
    window.location.href = bookmark.url;
  }

  navigateToTopicPosts(topic: TopicModel): void {
    this.router.navigate(['/topics', topic.id, "posts"], 
    { 
      state: { "endpoint": `topics/${topic.id}/posts` }
    });
  }
}
