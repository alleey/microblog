import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostListEvent } from 'blog';

@Component({
  selector: 'app-posts-list',
  templateUrl: './app-posts-list.component.html',
  styleUrls: ['./app-posts-list.component.scss']
})
export class AppPostsListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToPost(evt: BlogPostListEvent): void {
    const post = evt.item;
    this.router.navigate(["/posts", post.id, post.slug]);
  }

}
