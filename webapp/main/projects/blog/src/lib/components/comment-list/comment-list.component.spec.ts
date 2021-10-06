import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockPipe } from 'ng-mocks';
import { of, Subject, throwError } from 'rxjs';
import { AlertComponent, LoaderComponent, PagerComponent, PrettyDatePipe } from 'utils';
import { CommentListResponseModel } from '../../models/comment';
import { CommentsService } from '../../services/comments.service';
import { CommentListViewComponent, CommentListViewEvent } from '../comment-list-view/comment-list-view.component';
import { CommentListComponent } from './comment-list.component';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  let service: jasmine.SpyObj<CommentsService>;
  let route: ActivatedRoute;
  let router: Router;

  beforeEach(async () => {
    service = jasmine.createSpyObj<CommentsService>('CommentsService',
      ['all'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ 
        CommentListComponent, 
        MockComponent(CommentListViewComponent),
        MockComponent(AlertComponent),
        MockComponent(LoaderComponent),
        MockComponent(PagerComponent),
        MockPipe(PrettyDatePipe, value => value.toString()),
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: CommentsService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListComponent);
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

  it('should render comments list when found', () => {

    const postId = 1;
    const pageable = { page: 0 };
    const commentsResponse: CommentListResponseModel = {
      _embedded: {
        comments: [ 
          { id: 1,  text: "localhost", owner: "met", createdOn: new Date(), updateOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", postId, pageable).and.returnValue(of(commentsResponse));
    component.postId = postId;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.hasItems).toBeTrue();
    expect(component.page?.number).toEqual(0);
    expect(component.items).toEqual(commentsResponse._embedded.comments);
  });

  it('should NOT render comments list when NOT found', () => {

    const postId = 1;
    const pageable = { page: 0 };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", postId, pageable).and.returnValue(throwError(new Error()));
    component.postId = postId;
    fixture.detectChanges();

    expect(component).toBeTruthy();
    expect(component.hasItems).toBeFalse();
    expect(component.page?.number).toBeFalsy();
    expect(component.items).toBeFalsy();
  });

  it('should refresh when service onChange is triggered', () => {

    const postId = 1;
    const pageable = { page: 0 };
    const commentsResponse: CommentListResponseModel = {
      _embedded: {
        comments: [ 
          { id: 1,  text: "localhost", owner: "met", createdOn: new Date(), updateOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", postId, pageable).and.returnValue(of(commentsResponse));
    component.postId = postId;
    fixture.detectChanges();

    service.onChange.next({});
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalledTimes(2);
  });

  it('should go to page number passed as parameter', () => {

    const postId = 1;
    const pageable = { page: 1 };
    const commentsResponse: CommentListResponseModel = {
      _embedded: {
        comments: [ 
          { id: 1,  text: "localhost", owner: "met", createdOn: new Date(), updateOn: new Date() }
         ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ pageNum: 1 }))
    );

    service.all.withArgs("", postId, pageable).and.returnValue(of(commentsResponse));
    component.postId = postId;
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalled();
    expect(component.page?.number).toEqual(1);
  });

  it('should go to page number selected by pager', () => {

    const postId = 1;
    const commentsResponse: CommentListResponseModel = {
      _embedded: {
        comments: [ 
          { id: 1,  text: "localhost", owner: "met", createdOn: new Date(), updateOn: new Date() }
         ]
      },
      page: { number: 1, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", postId, { page: 0 }).and.returnValue(of(commentsResponse));
    component.postId = postId;
    fixture.detectChanges();

    service.all.withArgs("", postId, { page: 1 }).and.returnValue(of(commentsResponse));
    component.gotoPage(2);
    fixture.detectChanges();

    expect(service.all).toHaveBeenCalled();
  });

  it('should fire onEvent when clicked', () => {

    const postId = 1;
    const pageable = { page: 0 };   
    const commentsResponse: CommentListResponseModel = {
      _embedded: {
        comments: [ 
          { id: 1,  text: "localhost", owner: "met", createdOn: new Date(), updateOn: new Date() }
         ]
      },
      page: { number: 0, size: 1, totalElements:1, totalPages: 1 }
    };

    setCurrentNavigationState({ endpoint: "" });
    service.all.withArgs("", postId, pageable).and.returnValue(of(commentsResponse));
    component.postId = postId;
    fixture.detectChanges();

    const { debugElement } = fixture;
    const view = debugElement.query(By.directive(CommentListViewComponent)).componentInstance;

    let firedEvent: CommentListViewEvent|undefined = undefined;
    component.onEvent.subscribe((evt: CommentListViewEvent) => {
      firedEvent = evt;
    });
    view.onEvent.emit({ opcode: 'select', item: commentsResponse._embedded.comments[0] });
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(commentsResponse._embedded.comments[0]);
  });

});
