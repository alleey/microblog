import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OidcAuthService } from 'auth-oidc';
import { TopicListEvent } from 'blog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Pretty Useless Webapp';
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
    this.router.navigate(['users', this.userId, 'posts'],
    {
      state: { "endpoint": `users/${this.userId}/posts`, userId: this.userId, userName: this.userName }
    });
  }

  topicPosts(evt: TopicListEvent): void {
    const topic = evt.item;
    this.router.navigate(['/topics', topic.id, "posts"],
    {
      state: { "endpoint": `topics/${topic.id}/posts`, topic: topic }
    });
  }
}
