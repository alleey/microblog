import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FollowingListViewComponent, FollowingListViewEvent } from './following-list-view.component';
import { FollowsModel } from '../../models/follows';

describe('FollowingListViewComponent', () => {
  let component: FollowingListViewComponent;
  let fixture: ComponentFixture<FollowingListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowingListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowingListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

    const userId = "me";
    const followedById = "notme";
    const models: FollowsModel[] = [
      { userId: userId, followedById: followedById }
    ];

    component.items = models;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('[data-testid="select"]')).nativeElement;
    let firedEvent: FollowingListViewEvent|undefined = undefined;

    component.onSelectItem.subscribe({
      next: (evt: FollowingListViewEvent) => {
        firedEvent = evt;
      }
    });
    el.click();
    tick();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(models[0]);
  }));

});
