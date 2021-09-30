import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BlogPostViewComponent, BlogPostViewEvent } from './blog-post-view.component';
import { BlogPostModel } from '../../models/blog-post';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { UtilsModule } from 'utils';

describe('BlogPostViewComponent', () => {
  let component: BlogPostViewComponent;
  let fixture: ComponentFixture<BlogPostViewComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ BlogPostViewComponent ],
      imports: [UtilsModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostViewComponent);
    component = fixture.componentInstance;
  });

  it('should fire onSelect when edit clicked', fakeAsync(() => {

    const model: BlogPostModel = {
        id: 1,
        slug: "slug",
        title: "title",
        text: "text",
        owner: "me",
        permalink: "http://post/1",
        createdOn: new Date(),
        updateOn: new Date()
      };

    component.item = model;
    fixture.detectChanges();

    let editButton = fixture.debugElement.query(By.css('[data-testid="edit"]')).nativeElement;
    let firedEvent: BlogPostViewEvent|undefined = undefined;

    component.onSelectItem.subscribe({
      next: (evt: BlogPostViewEvent) => {
        firedEvent = evt;
      }
    });
    editButton.triggerEventHandler('click', {});
    tick();
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(model);
    expect(firedEvent!.opcode).toEqual("edit");
  }));

  it('should fire onSelect when delete clicked', fakeAsync(() => {

    const model: BlogPostModel = {
        id: 1,
        slug: "slug",
        title: "title",
        text: "text",
        owner: "me",
        permalink: "http://post/1",
        createdOn: new Date(),
        updateOn: new Date()
      };

    component.item = model;
    fixture.detectChanges();

    let deleteButton = fixture.debugElement.query(By.css('[data-testid="delete"]'));
    let firedEvent: BlogPostViewEvent|undefined = undefined;

    component.onSelectItem.subscribe({
      next: (evt: BlogPostViewEvent) => {
        firedEvent = evt;
      }
    });
    deleteButton.triggerEventHandler('click', {});
    tick();
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(model);
    expect(firedEvent!.opcode).toEqual("delete");
  }));

});
