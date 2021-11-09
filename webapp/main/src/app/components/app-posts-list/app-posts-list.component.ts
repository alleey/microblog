import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostListEvent } from 'blog';

@Component({
  selector: 'app-posts-list',
  templateUrl: './app-posts-list.component.html',
  styleUrls: ['./app-posts-list.component.scss']
})
export class AppPostsListComponent implements OnInit {

  @Input() itemTemplate: TemplateRef<any> | undefined;
  @Input() headerTemplate: TemplateRef<any> | undefined;
  @Input() footerTemplate: TemplateRef<any> | undefined;

  constructor(private router: Router) { }

  ngOnInit(): void { }

  navigateToPost(evt: BlogPostListEvent): void {
    const post = evt.item;
    this.router.navigate(["/posts", post.id, post.slug]);
  }

}
