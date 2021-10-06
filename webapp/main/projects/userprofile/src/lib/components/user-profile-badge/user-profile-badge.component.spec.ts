import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { of, throwError } from 'rxjs';
import { UserProfileModel, UserProfileResponseModel } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfileBadgeViewComponent } from '../user-profile-badge-view/user-profile-badge-view.component';
import { UserProfileBadgeComponent } from './user-profile-badge.component';


describe('UserProfileBadgeComponent', () => {
  let component: UserProfileBadgeComponent;
  let fixture: ComponentFixture<UserProfileBadgeComponent>;
  let service: jasmine.SpyObj<UserProfileService>;
  let route: ActivatedRoute;

  beforeEach(async () => {

    service = jasmine.createSpyObj<UserProfileService>('UserProfileService', 
      ['one']
    );

    await TestBed.configureTestingModule({
      declarations: [ 
        UserProfileBadgeComponent, 
        MockComponent(UserProfileBadgeViewComponent) 
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: UserProfileService, useValue: service },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileBadgeComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute);
  });

  it('should render badge when userprofile is found', () => {

    const { debugElement } = fixture;

    const userId = "useruseruser";
    const userProfile: UserProfileResponseModel = {
      id: userId,
      firstName: "first name", lastName: "last name", username: "username",
    };

    service.one.withArgs("", userId).and.returnValue(of(userProfile));

    component.paramUserId = userId;
    fixture.detectChanges();

    const badge = debugElement.query(By.css('user-profile-badge-view'));
    
    expect(badge).toBeTruthy();
    expect(component.userProfileItem).toEqual(userProfile);
  });

  it('should render error if user not found', () => {

    const { debugElement } = fixture;

    const userId = "useruseruser";
    service.one.withArgs("", userId).and.returnValue(throwError(new Error()));
    
    component.paramUserId = userId;
    fixture.detectChanges();

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

    spyOnProperty(route, "paramMap").and.returnValue(
      of(convertToParamMap({ userId: userId }))
    );
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

  it('should invoke onEvent when clicked', () => {

    const { debugElement } = fixture;

    const userId = "useruseruser";
    const userProfile: UserProfileResponseModel = {
      id: userId,
      firstName: "first name", lastName: "last name", username: "username",
    };
    service.one.withArgs("", userId).and.returnValue(of(userProfile));
    
    component.paramUserId = userId;
    fixture.detectChanges();

    const badge = debugElement.query(By.directive(UserProfileBadgeViewComponent)).componentInstance;

    let firedEvent: UserProfileModel|undefined = undefined;
    component.onEvent.subscribe((evt: UserProfileModel) => {
      firedEvent = evt;
    });
    badge.onEvent.emit({ opcode: 'select', item: userProfile });

    expect(firedEvent).toBeTruthy();
  });

});
