import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UtilsModule } from 'projects/utils/src/public-api';

import { BlogPostListViewComponent, BlogPostListViewEvent } from './blog-post-list-view.component';
import { BlogPostModel } from '../../models/blog-post';

describe('BlogPostListViewComponent', () => {
  let component: BlogPostListViewComponent;
  let fixture: ComponentFixture<BlogPostListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogPostListViewComponent ],
      imports: [UtilsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostListViewComponent);
    component = fixture.componentInstance;
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

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

    component.onSelectItem.subscribe({
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
