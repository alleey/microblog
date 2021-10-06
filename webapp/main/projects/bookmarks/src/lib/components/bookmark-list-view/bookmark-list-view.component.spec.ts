import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BookmarkListViewComponent, BookmarkListViewEvent } from './bookmark-list-view.component';


describe('BookmarkListViewComponent', () => {
  let component: BookmarkListViewComponent;
  let fixture: ComponentFixture<BookmarkListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fire onEvent when clicked', () => {

    const models = [
      { id: 1,  caption: "localhost",  url: "http://localhost",  createdOn: new Date(),  lastAccessedOn: new Date() }
    ];

    component.bookmarks = models;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('[data-testid="select"]')).nativeElement;
    let firedEvent: BookmarkListViewEvent|undefined = undefined;

    component.onEvent.subscribe({
      next: (evt: BookmarkListViewEvent) => {
        firedEvent = evt;
      }
    });
    el.click();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(models[0]);
  });

});
