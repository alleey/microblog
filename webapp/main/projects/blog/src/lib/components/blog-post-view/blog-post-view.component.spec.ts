import { By } from '@angular/platform-browser';
import { RequireOwnerDirective } from 'auth-oidc';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';
import { PrettyDatePipe } from 'utils';
import { BlogPostModel } from '../../models/blog-post';
import { CommentEditorComponent } from '../comment-editor/comment-editor.component';
import { CommentListComponent } from '../comment-list/comment-list.component';
import { TopicListViewComponent } from '../topic-list-view/topic-list-view.component';
import { BlogPostViewComponent, BlogPostViewEvent } from './blog-post-view.component';

describe('BlogPostViewComponent', () => {

  beforeEach(() => {
    return MockBuilder(BlogPostViewComponent)
    .mock(TopicListViewComponent)
    .mock(CommentListComponent)
    .mock(CommentEditorComponent)
    .mock(RequireOwnerDirective)
    .mock(PrettyDatePipe, value => value.toString());
  });

  it('should fire onEvent when edit clicked', () => {

    const fixture = MockRender(BlogPostViewComponent);
    const component = fixture.point.componentInstance;

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

    ngMocks.findInstances(RequireOwnerDirective).forEach(i => ngMocks.render(i, i));

    let editButton = fixture.debugElement.query(By.css('[data-testid="edit"]'));
    let firedEvent: BlogPostViewEvent|undefined = undefined;

    component.onEvent.subscribe({
      next: (evt: BlogPostViewEvent) => {
        firedEvent = evt;
      }
    });
    editButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(model);
    expect(firedEvent!.opcode).toEqual("edit");
  });

  it('should fire onEvent when delete clicked', () => {

    const fixture = MockRender(BlogPostViewComponent);
    const component = fixture.point.componentInstance;

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

    ngMocks.findInstances(RequireOwnerDirective).forEach(i => ngMocks.render(i, i));

    let deleteButton = fixture.debugElement.query(By.css('[data-testid="delete"]'));
    let firedEvent: BlogPostViewEvent|undefined = undefined;

    component.onEvent.subscribe({
      next: (evt: BlogPostViewEvent) => {
        firedEvent = evt;
      }
    });
    deleteButton.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(model);
    expect(firedEvent!.opcode).toEqual("delete");
  });

});
