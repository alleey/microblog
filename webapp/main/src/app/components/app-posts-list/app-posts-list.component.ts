import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostModel } from 'projects/blog/src/public-api';

@Component({
  selector: 'app-posts-list',
  templateUrl: './app-posts-list.component.html',
  styleUrls: ['./app-posts-list.component.scss']
})
export class AppPostsListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToPost(post: BlogPostModel): void {
    this.router.navigate(["/posts", post.id, post.slug]);
  }

}
