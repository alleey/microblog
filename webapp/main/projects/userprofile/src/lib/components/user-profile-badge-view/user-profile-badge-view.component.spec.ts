import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserProfileModel } from '../../models/user-profile';

import { UserProfileBadgeViewComponent, UserProfileBadgeViewEvent } from './user-profile-badge-view.component';

describe('UserProfileBadgeViewComponent', () => {
  let component: UserProfileBadgeViewComponent;
  let fixture: ComponentFixture<UserProfileBadgeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileBadgeViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileBadgeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

    const model: UserProfileModel = {
      id: "userId",
      firstName: "first name",
      lastName: "last name",
      username: "username",
    };

    component.userProfile = model;
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('[data-testid="userName"]')).nativeElement;
    let firedEvent: UserProfileBadgeViewEvent|undefined = undefined;

    component.onSelectItem.subscribe({
      next: (evt: UserProfileBadgeViewEvent) => {
        firedEvent = evt;
      }
    });
    el.click();
    tick();

    expect(firedEvent).toBeTruthy();
    expect(component.userId).toEqual(model.id);
  }));

});
