import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcAuthService } from 'auth-oidc';
import { TopicListEvent } from 'blog';
import { BookmarkListEvent } from 'bookmarks';

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
      .subscribe(user => {
        this.userProfile = user?.profile;
      });
  }

  get userId(): string { return this.userProfile?.sub; }
  get userName(): string { return this.userProfile?.name; }

  userPosts() : void {
    console.log(this.userProfile);
    this.router.navigate(['user', this.userId, 'posts'], 
    { 
      state: { "endpoint": `users/${this.userId}/posts` }
    });
  }

  navigateBookmark(evt: BookmarkListEvent): void {
    const bookmark = evt.item;
    console.info(`Navigate to ${bookmark.url}`)
    window.location.href = bookmark.url;
  }

  navigateToTopicPosts(evt: TopicListEvent): void {
    const topic = evt.item;
    this.router.navigate(['/topics', topic.id, "posts"], 
    { 
      state: { "endpoint": `topics/${topic.id}/posts` }
    });
  }
}
