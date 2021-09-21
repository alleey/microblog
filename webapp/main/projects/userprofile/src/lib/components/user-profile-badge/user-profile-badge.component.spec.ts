import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { BehaviorSubject, of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { UserProfileService } from '../../services/user-profile.service';
import { UserProfileModel } from '../../models/user-profile';
import { UserProfileBadgeComponent } from './user-profile-badge.component';
import { UserProfileResponseModel } from '../../models/user-profile';
import { UserProfileBadgeViewComponent } from '../user-profile-badge-view/user-profile-badge-view.component';

describe('UserProfileBadgeComponent', () => {
  let component: UserProfileBadgeComponent;
  let fixture: ComponentFixture<UserProfileBadgeComponent>;
  let service: jasmine.SpyObj<UserProfileService>;
  let activatedRouteParams = new BehaviorSubject<any>({ userId: "" });

  beforeEach(async () => {

    service = jasmine.createSpyObj<UserProfileService>('UserProfileService', 
      ['one']
    );

    await TestBed.configureTestingModule({
      declarations: [ UserProfileBadgeComponent, UserProfileBadgeViewComponent ],
      providers: [
        { provide: UserProfileService, useValue: service },
        { 
          provide: ActivatedRoute, 
          useValue: {
            params: activatedRouteParams
          } 
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileBadgeComponent);
    component = fixture.componentInstance;
    activatedRouteParams.next({ userId: "" });
  });

  it('should render badge when userprofile is found', () => {

    const userId = "useruseruser";
    const userProfile: UserProfileResponseModel = {
      id: userId,
      firstName: "first name", lastName: "last name", username: "username",
    };

    service.one.withArgs("", userId).and.returnValue(of(userProfile));

    component.paramUserId = userId;
    fixture.detectChanges();

    const { debugElement } = fixture;
    const badge = debugElement.query(By.css('user-profile-badge-view'));
    
    expect(badge).toBeTruthy();
  });

  it('should render error if user not found', () => {

    const userId = "useruseruser";
    service.one.withArgs("", userId).and.returnValue(throwError(new Error()));
    
    component.paramUserId = userId;
    fixture.detectChanges();

    const { debugElement } = fixture;
    const badge = debugElement.query(By.css('user-profile-badge-view'));
    const alert = debugElement.query(By.css('utils-alert'));
    
    expect(badge).toBeFalsy();
    expect(alert).toBeTruthy();
  });

  it('should take userid from path', () => {

    const userId = "useruseruser";
    const userProfile: UserProfileResponseModel = {
      id: userId,
      firstName: "first name", lastName: "last name", username: "username",
    };
    service.one.withArgs("", userId).and.returnValue(of(userProfile));

    activatedRouteParams.next({ userId: userId });
    component.paramUserId = "thisshouldnotbeused";
    fixture.detectChanges();

    expect(service.one).toHaveBeenCalledOnceWith("", userId);
  });

  it('should take userid from input', () => {

    const userId = "useruseruser";
    const userProfile: UserProfileResponseModel = {
      id: userId,
      firstName: "first name", lastName: "last name", username: "username",
    };
    service.one.withArgs("", userId).and.returnValue(of(userProfile));
    
    component.paramUserId = userId;
    fixture.detectChanges();

    expect(service.one).toHaveBeenCalledOnceWith("", userId);
  });

  it('should fire onSelect when clicked', fakeAsync(() => {

    const userId = "useruseruser";
    const userProfile: UserProfileResponseModel = {
      id: userId,
      firstName: "first name", lastName: "last name", username: "username",
    };
    service.one.withArgs("", userId).and.returnValue(of(userProfile));
    
    component.paramUserId = userId;
    fixture.detectChanges();

    const { debugElement } = fixture;
    const badge = debugElement.query(By.directive(UserProfileBadgeViewComponent)).componentInstance;

    let firedEvent: UserProfileModel|undefined = undefined;
    component.onSelect = (evt: UserProfileModel) => {
      firedEvent = evt;
    };
    badge.onSelectItem.emit({ opcode: 'select', item: userProfile });
    tick();

    expect(firedEvent).toBeTruthy();
  }));

});
