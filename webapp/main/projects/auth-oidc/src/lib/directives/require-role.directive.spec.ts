import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { OidcAuthService, User } from '../services/auth.service';
import { RequireRoleDirective } from './require-role.directive';

@Component({
  template: `
  <div data-testid="first" >
    <div *authRequireRole="'admin' different 'no' then positive else negative"></div>
  </div>
  <div data-testid="second" >
    <div *authRequireRole="'admin' different 'yes' then positive else negative"></div>
  </div>
  <div data-testid="third">
    <div *authRequireRole="'admin'">Default</div>
  </div>

  <ng-template #positive>Positive</ng-template>
  <ng-template #negative>Negative</ng-template>
  `
})
class HostComponent {}

describe('RequireRoleDirective', () => {

  let fixture: ComponentFixture<HostComponent>;
  let service: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService',
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [HostComponent, RequireRoleDirective],
      providers: [
        { provide: OidcAuthService, useValue: service }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should NOT render if user is not logged', () => {

    service.userSubject.next(null);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="third"]'));

    expect(element.nativeElement.innerHTML).not.toContain("Default");
  });

  it('should render THEN template if admin is logged in and require different is NO', () => {

    const fakeUser = {
      profile: {}
    } as User;
    fakeUser.profile.roles = ['admin'];

    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="first"]'));

    expect(element.nativeElement.innerHTML).toContain("Positive");
    expect(element.nativeElement.innerHTML).not.toContain("Negative");
  });

  it('should render ELSE template if Not-admin is logged in and require different is NO', () => {

    const fakeUser = {
      profile: {}
    } as User;
    fakeUser.profile.roles = ['notadmin'];

    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="first"]'));

    expect(element.nativeElement.innerHTML).not.toContain("Positive");
    expect(element.nativeElement.innerHTML).toContain("Negative");
  });


  it('should render ELSE template if admin is logged in and require different is YES', () => {

    const fakeUser = {
      profile: {}
    } as User;
    fakeUser.profile.roles = ['admin'];

    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="second"]'));

    expect(element.nativeElement.innerHTML).not.toContain("Positive");
    expect(element.nativeElement.innerHTML).toContain("Negative");
  });

  it('should render THEN template if Not-admin is logged in and require different is YES', () => {

    const fakeUser = {
      profile: {}
    } as User;
    fakeUser.profile.roles = ['notadmin'];

    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="second"]'));

    expect(element.nativeElement.innerHTML).toContain("Positive");
    expect(element.nativeElement.innerHTML).not.toContain("Negative");
  });

});
