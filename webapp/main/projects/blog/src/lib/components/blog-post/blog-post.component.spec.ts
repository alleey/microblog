import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockPipe } from 'ng-mocks';
import { of, Subject } from 'rxjs';
import { AlertComponent, LoaderComponent, PrettyDatePipe } from 'utils';
import { BlogPostResponseModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { BlogPostViewComponent } from '../blog-post-view/blog-post-view.component';
import { BlogPostComponent, BlogPostEvent } from './blog-post.component';

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
      declarations: [
        BlogPostComponent,
        MockComponent(BlogPostViewComponent),
        MockComponent(AlertComponent),
        MockComponent(LoaderComponent),
        MockPipe(PrettyDatePipe, value => value.toString()),
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: PostsService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render post details', () => {

    const { debugElement } =  fixture;

    const post: BlogPostResponseModel = {
      id: 1,
      slug: "slug",
      title: "title",
      text: "text",
      owner: "me",
      permalink: "http://post/1",
      createdOn: new Date(),
      updateOn: new Date()
    };

    service.one.withArgs("", post.id).and.returnValue(of(post));
    component.paramPostId = post.id;
    fixture.detectChanges();

    expect(service.one).toHaveBeenCalled();
    expect(component.postId).toBeTruthy();
    expect(component.postSlug).toEqual(post.slug);
  });


  it('should fire onEvent when clicked', () => {

    const { debugElement } =  fixture;

    const post: BlogPostResponseModel = {
      id: 1,
      slug: "slug",
      title: "title",
      text: "text",
      owner: "me",
      permalink: "http://post/1",
      createdOn: new Date(),
      updateOn: new Date()
    };

    service.one.withArgs("", post.id).and.returnValue(of(post));
    component.paramPostId = post.id;
    fixture.detectChanges();

    let firedEvent: BlogPostEvent|undefined = undefined;
    component.onEvent.subscribe((evt: BlogPostEvent) => {
      firedEvent = evt;
    });

    const view = debugElement.query(By.directive(BlogPostViewComponent)).componentInstance;
    view.onEvent.emit({ opcode: 'custom', item: post });
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
  });

});
