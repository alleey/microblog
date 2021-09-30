import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';

import { PostsService } from '../../services/posts.service';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent', () => {
  let component: BlogPostComponent;
  let fixture: ComponentFixture<BlogPostComponent>;
  let service: jasmine.SpyObj<PostsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    
    service = jasmine.createSpyObj<PostsService>('PostsService',
      ['one'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ BlogPostComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: PostsService, useValue: service },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
