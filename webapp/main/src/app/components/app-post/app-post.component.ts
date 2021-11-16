import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostEvent, BlogPostModel } from 'blog';
import { BlogPostComponent } from 'projects/blog/src/public-api';

@Component({
  selector: 'app-app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.scss']
})
export class AppPostComponent implements OnInit {

  @ViewChild('blogPost')
  blotPostComponent!: BlogPostComponent;

  constructor(private router: Router) { }

  ngOnInit(): void {}

  handleBlogPostEvent(evt: BlogPostEvent) {
    console.log(evt);
    switch(evt.opcode) {
      case 'edit': this.editPost(evt.item); break;
      case 'delete': this.blotPostComponent.deletePost(evt.item); break;
      case 'deleted': this.router.navigate(['/posts']); break;
    }
  }

  editPost(post: BlogPostModel): void {
    this.router.navigate(['/posts', 'edit', post.id]);
  }
}
