import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UtilsModule } from 'utils';

import { CommentListViewComponent, CommentListViewEvent } from './comment-list-view.component';
import { CommentModel } from '../../models/comment';

describe('CommentListViewComponent', () => {
  let component: CommentListViewComponent;
  let fixture: ComponentFixture<CommentListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentListViewComponent ],
      imports: [UtilsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListViewComponent);
    component = fixture.componentInstance;
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

    const models: CommentModel[] = [
      { 
        id: 1, 
        text: "text",
        owner: "me",
        createdOn: new Date(), 
        updateOn: new Date() 
      }
    ];

    component.items = models;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('[data-testid="select"]')).nativeElement;
    let firedEvent: CommentListViewEvent|undefined = undefined;

    component.onSelectItem.subscribe({
      next: (evt: CommentListViewEvent) => {
        firedEvent = evt;
      }
    });
    el.click();
    tick();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(models[0]);
  }));

});
