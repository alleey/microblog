import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertComponent;
  let fixture: ComponentFixture<AlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title correctly', () => {
    component.title = "test";

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    expect(debugElement.nativeElement.innerHTML).toContain(component.title);
  });

  it('should render dismissable', () => {

    const { debugElement } = fixture;

    component.dismissable = true;
    fixture.detectChanges();
    const closeButton = debugElement.query(
      By.css('[data-dismiss="alert"]')
    );    

    expect(closeButton).toBeTruthy();
  });

  it('should not render dismissable', () => {

    const { debugElement } = fixture;

    component.dismissable = false;
    fixture.detectChanges();
    const closeButton = debugElement.query(
      By.css('[data-dismiss="alert"]')
    );    

    expect(closeButton).toBeFalsy();
  });

  it('close button click should emit event', () => {

    const { debugElement } = fixture;

    component.dismissable = true;
    fixture.detectChanges();
    const closeButton = debugElement.query(
      By.css('[data-testid="close"]')
    ).nativeElement;
    
    let eventFired = false;
    component.onClosed.subscribe({
      next: () => { 
        eventFired = true;
      }
    });
    closeButton.click();

    expect(eventFired).toBeTrue();
  });
});

