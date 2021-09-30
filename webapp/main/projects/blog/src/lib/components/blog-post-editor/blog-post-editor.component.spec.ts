import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PostsServiceConfigToken } from '../../config/config';
import { Subject } from 'rxjs';
import { PostsService } from '../../services/posts.service';

import { BlogPostEditorComponent } from './blog-post-editor.component';

describe('BlogPostEditorComponent', () => {
  let component: BlogPostEditorComponent;
  let fixture: ComponentFixture<BlogPostEditorComponent>;
  let service: jasmine.SpyObj<PostsService>;
  let route: ActivatedRoute;

  beforeEach(async () => {
    service = jasmine.createSpyObj<PostsService>('PostsService',
      ['one','create','update','assignTopics'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ BlogPostEditorComponent ],
      imports: [RouterTestingModule],
      providers: [
        { provide: PostsService, useValue: service },
        { provide: PostsServiceConfigToken, useValue: { serviceBaseUrl: "http://localhost", defaultEndpoint: "blog", pageSize: 10 } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostEditorComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
