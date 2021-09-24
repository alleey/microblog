import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FollowersListViewComponent, FollowerListViewEvent } from './follower-list-view.component';
import { FollowsModel } from '../../models/follows';

describe('FollowersListViewComponent', () => {
  let component: FollowersListViewComponent;
  let fixture: ComponentFixture<FollowersListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowersListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowersListViewComponent);
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

    let el = fixture.debugElement.query(By.css('[data-testid="userName"]')).nativeElement;
    let firedEvent: FollowerListViewEvent|undefined = undefined;

    component.onSelectItem.subscribe({
      next: (evt: FollowerListViewEvent) => {
        firedEvent = evt;
      }
    });
    el.click();
    tick();

    expect(firedEvent).toBeTruthy();
    expect(firedEvent!.item).toEqual(models[0]);
  }));

});
