import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogPostEvent, BlogPostModel, PostsService } from 'blog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';

@Component({
  selector: 'app-app-post',
  templateUrl: './app-post.component.html',
  styleUrls: ['./app-post.component.scss']
})
export class AppPostComponent implements OnInit {

  destroyed$ = new Subject();
  viewModel = new ViewModelHolder<any>();

  constructor(
    private service: PostsService, 
    private router: Router) 
  { }

  ngOnInit(): void {}

  handleBlogPostEvent(evt: BlogPostEvent) {
    console.log(evt);
    switch(evt.opcode) {
      case 'edit': this.editPost(evt.item); break;
      case 'delete': this.deletePost(evt.item); break;
    }
  }

  editPost(post: BlogPostModel): void {
    this.router.navigate(['/posts', 'edit', post.id]);
  }

  deletePost(post: BlogPostModel): void {
    this.service
      .delete("", post.id + 1555555)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectNothing({
        nextObserver: 
        {
          next: (i:any) => this.router.navigate(['/posts'])
        }
      }));
  }

}
