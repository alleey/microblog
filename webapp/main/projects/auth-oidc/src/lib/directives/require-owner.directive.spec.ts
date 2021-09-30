import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { OidcAuthService, User } from '../services/auth.service';
import { RequireOwnerDirective } from './require-owner.directive';

@Component({
  template: `
  <div data-testid="first" >
    <div *authRequireOwner="'me' different 'no' then positive else negative"></div>
  </div>
  <div data-testid="second" >
  <div *authRequireOwner="'me' different 'yes' then positive else negative"></div>
  </div>
  <div data-testid="third">
    <div  *authRequireOwner="'me'">Default</div>
  </div>

  <ng-template #positive>Positive</ng-template>
  <ng-template #negative>Negative</ng-template>
  `
})
class HostComponent {}

describe('RequireOwnerDirective', () => {

  let fixture: ComponentFixture<HostComponent>;
  let service: jasmine.SpyObj<OidcAuthService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<OidcAuthService>('OidcAuthService', 
      [], {
        userSubject: new BehaviorSubject<any>(undefined)
      }
    );

    await TestBed.configureTestingModule({
      declarations: [HostComponent, RequireOwnerDirective],
      providers: [
        { provide: OidcAuthService, useValue: service }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
  });

  it('should NOT render if user is not logged', () => {
    
    service.userSubject.next(null);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="third"]'));

    expect(element.nativeElement.innerHTML).not.toContain("Default");
  }); 

  it('should render THEN template if owner is logged in and require different is NO', () => {
    
    const fakeUser = {
      profile: { sub: 'me' }
    } as User;
    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="first"]'));

    expect(element.nativeElement.innerHTML).toContain("Positive");
    expect(element.nativeElement.innerHTML).not.toContain("Negative");
  }); 

  it('should render ELSE template if owner is logged in and require different is YES', () => {
    
    const fakeUser = {
      profile: { sub: 'me' }
    } as User;
    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="second"]'));

    expect(element.nativeElement.innerHTML).not.toContain("Positive");
    expect(element.nativeElement.innerHTML).toContain("Negative");
  }); 

  it('should render ELSE template if Not-owner is logged in and require different is NO', () => {
    
    const fakeUser = {
      profile: { sub: 'notme' }
    } as User;
    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="first"]'));

    expect(element.nativeElement.innerHTML).not.toContain("Positive");
    expect(element.nativeElement.innerHTML).toContain("Negative");
  }); 

  it('should render THEN template if Not-owner is logged in and require different is YES', () => {
    
    const fakeUser = {
      profile: { sub: 'notme' }
    } as User;
    service.userSubject.next(fakeUser);
    fixture.detectChanges();

    const { debugElement } = fixture;
    const element = debugElement.query(By.css('[data-testid="second"]'));

    expect(element.nativeElement.innerHTML).toContain("Positive");
    expect(element.nativeElement.innerHTML).not.toContain("Negative");
  }); 

});
