import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OidcAuthService } from 'auth-oidc';
import { BehaviorSubject } from 'rxjs';
import { FollowingService } from '../../services/following.service';

import { FollowersListComponent } from './follower-list.component';

describe('FollowersListComponent', () => {
  let component: FollowersListComponent;
  let fixture: ComponentFixture<FollowersListComponent>;
  let service: jasmine.SpyObj<FollowingService>;
  let authService: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<FollowingService>('FollowingService', 
      ['followers'], {
        onChange: new BehaviorSubject<any>(undefined)
      }
    );
    authService = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [ FollowersListComponent ],
      providers: [
        { provide: FollowingService, useValue: service },
        { provide: OidcAuthService, useValue: authService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowersListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
