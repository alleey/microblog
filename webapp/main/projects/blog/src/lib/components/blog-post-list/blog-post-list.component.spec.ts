import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent, LoaderComponent, PagerComponent } from 'utils';
import { BlogPostListResponseModel } from '../../models/blog-post';
import { PostsService } from '../../services/posts.service';
import { BlogPostListViewComponent } from '../blog-post-list-view/blog-post-list-view.component';
import { BlogPostListComponent, BlogPostListEvent } from './blog-post-list.component';


describe('BlogPostListComponent', () => {
  let component: BlogPostListComponent;
  let fixture: ComponentFixture<BlogPostListComponent>;
  let service: jasmine.SpyObj<PostsService>;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    service = jasmine.createSpyObj<PostsService>('PostsService',
      ['all'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ 
        BlogPostListComponent,
        MockComponent(BlogPostListViewComponent),
        MockComponent(AlertComponent),
        MockComponent(LoaderComponent),
        MockComponent(PagerComponent),
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: PostsService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostListComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
  });

  function setCurrentNavigationState(state: any): void {
    spyOn(router, 'getCurrentNavigation').and.returnValue({ 
      extras: { 
        state: state
      } 
    } as any);
  }

  it('should render posts list when found', () => {

    const postId = 1;
    const pageable = { page: 0 };
    const postsResponse: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", pageable).and.returnValue(of(postsResponse));
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(postsResponse._embedded.posts);
  });

  it('should NOT render posts list when NOT found', () => {

    const postId = 1;
    const pageable = { page: 0 };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", pageable).and.returnValue(throwError(new Error()));
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.hasItems).toBeFalse();
    expect(component.page?.number).toBeFalsy();
    expect(component.items).toBeFalsy();
  });

  it('should refresh when service onChange is triggered', () => {

    const postId = 1;
    const pageable = { page: 0 };
    const postsResponse: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", pageable).and.returnValue(of(postsResponse));
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalledTimes(2);
  });

  it('should go to page number passed as parameter', () => {

    const postId = 1;
    const pageable = { page: 1 };
    const postsResponse: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ pageNum: 1 }))
    );

    service.all.withArgs("", pageable).and.returnValue(of(postsResponse));
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalled();
    expect(component.page?.number).toEqual(1);
  });

  it('should go to page number selected by pager', () => {

    const postId = 1;
    const postsResponse: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", { page: 0 }).and.returnValue(of(postsResponse));
    fixture.detectChanges();

    service.all.withArgs("", { page: 1 }).and.returnValue(of(postsResponse));
    component.gotoPage(2);
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalled();
  });

  it('should fire onEvent when clicked', () => {

    const pageable = { page: 0 };   
    const postsResponse: BlogPostListResponseModel = {
      _embedded: {
        posts: [
          { 
            id: 1, 
            slug: "slug",
            title: "title",
            text: "text",
            owner: "me",
            permalink: "http://post/1",
            createdOn: new Date(), 
            updateOn: new Date() 
          }
        ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", pageable).and.returnValue(of(postsResponse));
    fixture.detectChanges();

    const { debugElement } = fixture;
    const view = debugElement.query(By.directive(BlogPostListViewComponent)).componentInstance;

    let firedEvent: BlogPostListEvent|undefined = undefined;
    component.onEvent.subscribe((evt: BlogPostListEvent) => {
      firedEvent = evt;
    });
    view.onEvent.emit({ opcode: 'select', item: postsResponse._embedded.posts[0] });
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(postsResponse._embedded.posts[0]);
  });

});
