import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent, MockPipe } from 'ng-mocks';
import { PrettyDatePipe } from 'utils';
import { BlogPostModel } from '../../models/blog-post';
import { BlogPostListViewComponent, BlogPostListViewEvent } from './blog-post-list-view.component';
import { TopicListViewComponent } from '../topic-list-view/topic-list-view.component';

describe('BlogPostListViewComponent', () => {
  let component: BlogPostListViewComponent;
  let fixture: ComponentFixture<BlogPostListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        BlogPostListViewComponent,
        MockComponent(TopicListViewComponent),
        MockPipe(PrettyDatePipe, value => value.toString()),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostListViewComponent);
    component = fixture.componentInstance;
  });

  it('should fire onEvent when clicked', fakeAsync(() => {

    const models: BlogPostModel[] = [
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
    ];

    component.items = models;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('[data-testid="select"]')).nativeElement;
    let firedEvent: BlogPostListViewEvent|undefined = undefined;

    component.onEvent.subscribe({
      next: (evt: BlogPostListViewEvent) => {
        firedEvent = evt;
      }
    });
    el.click();
    tick();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(models[0]);
  }));

});
