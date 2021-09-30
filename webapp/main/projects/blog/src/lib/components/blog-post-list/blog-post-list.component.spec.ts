import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { PostsService } from '../../services/posts.service';
import { BlogPostListComponent } from './blog-post-list.component';

describe('BlogPostListComponent', () => {
  let component: BlogPostListComponent;
  let fixture: ComponentFixture<BlogPostListComponent>;
  let service: jasmine.SpyObj<PostsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    service = jasmine.createSpyObj<PostsService>('PostsService',
      ['one'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ BlogPostListComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: PostsService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
