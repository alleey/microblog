import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { OidcAuthService, User } from '../services/auth.service';
import { RequireLoginDirective } from './require-login.directive';

@Component({
  template: `
  <div data-testid="first" >
    <div *authRequireLogin="'yes' then positive else negative"></div>
  </div>
  <div data-testid="second" >
    <div *authRequireLogin="'no' then positive else negative"></div>
  </div>
  <div data-testid="third" >
    <div *authRequireLogin="'yes'">Default</div>
  </div>

  <ng-template #positive>Positive</ng-template>
  <ng-template #negative>Negative</ng-template>
  `
})
class HostComponent {}

describe('RequireLoginDirective', () => {

  let fixture: ComponentFixture<HostComponent>;
  let service: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [HostComponent, RequireLoginDirective],
      providers: [
        { provide: OidcAuthService, useValue: service }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should render if user is logged in and require is YES', () => {
    
    const fakeUser = {
      token_type: 'my_type', access_token: "dummy",
      profile: {}
    } as User;
    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="third"]'));

    expect(element.nativeElement.innerHTML).toContain("Default");
  }); 

  it('should NOT render if user is not logged in and require is YES', () => {
    
    service.userSubject.next(null);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="third"]'));

    expect(element.nativeElement.innerHTML).not.toContain("Default");
  }); 

  it('should render THEN template if user is logged in and require is YES', () => {
    
    const fakeUser = {
      token_type: 'my_type', access_token: "dummy",
      profile: {}
    } as User;
    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="first"]'));

    expect(element.nativeElement.innerHTML).toContain("Positive");
    expect(element.nativeElement.innerHTML).not.toContain("Negative");
  }); 

  it('should render ELSE template if user is NOT logged in and require is YES', () => {
    
    service.userSubject.next(null);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="first"]'));
    
    expect(element.nativeElement.innerHTML).toContain("Negative");
    expect(element.nativeElement.innerHTML).not.toContain("Positive");

  });

  it('should render ELSE template if user is logged in and require is NO', () => {
    
    const fakeUser = {
      token_type: 'my_type', access_token: "dummy",
      profile: {}
    } as User;
    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="second"]'));

    expect(element.nativeElement.innerHTML).toContain("Negative");
    expect(element.nativeElement.innerHTML).not.toContain("Positive");
  }); 

  it('should render THEN template if user is NOT logged in and require is YES', () => {
    
    service.userSubject.next(null);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="second"]'));
    
    expect(element.nativeElement.innerHTML).toContain("Positive");
    expect(element.nativeElement.innerHTML).not.toContain("Negative");
  });

});
