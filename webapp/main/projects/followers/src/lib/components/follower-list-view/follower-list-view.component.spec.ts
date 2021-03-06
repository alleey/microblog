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
  });

  it('should fire onEvent when clicked', fakeAsync(() => {

    const userId = "me";
    const followedById = "notme";
    const models: FollowsModel[] = [
      { userId: userId, followedById: followedById }
    ];

    component.items = models;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('[data-testid="select"]')).nativeElement;
    let firedEvent: FollowerListViewEvent|undefined = undefined;

    component.onEvent.subscribe({
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
