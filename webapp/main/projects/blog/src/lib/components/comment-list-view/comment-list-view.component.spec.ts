import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockPipe } from 'ng-mocks';
import { PrettyDatePipe } from 'utils';
import { CommentModel } from '../../models/comment';
import { CommentListViewComponent, CommentListViewEvent } from './comment-list-view.component';


describe('CommentListViewComponent', () => {
  let component: CommentListViewComponent;
  let fixture: ComponentFixture<CommentListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ 
        CommentListViewComponent,
        MockPipe(PrettyDatePipe, value => value.toString()),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentListViewComponent);
    component = fixture.componentInstance;
  });

  it('should fire onEvent when clicked', fakeAsync(() => {

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

    component.onEvent.subscribe({
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
