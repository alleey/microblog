import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let component: BadgeComponent;
  let fixture: ComponentFixture<BadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render active caption correctly', () => {
    component.isActive = true;
    component.activeCaption = "active";

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    expect(debugElement.nativeElement.innerHTML).toContain(component.activeCaption);
  });

  it('should render active caption for inactive, when inactive is not specified', () => {
    component.isActive = false;
    component.activeCaption = "active";

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    expect(debugElement.nativeElement.innerHTML).toContain(component.activeCaption);
  });

  it('should render inactive caption for inactive, when inactive is specified', () => {
    component.isActive = false;
    component.activeCaption = "active";
    component.inactiveCaption = "inactive";

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    expect(debugElement.nativeElement.innerHTML).toContain(component.inactiveCaption);
  });

  it('should fire remove event when active', () => {

    component.isActive = true;

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    let eventHandlerCalled = false;
    component.onRemove.subscribe({
      next: () => {
        eventHandlerCalled = true;
      }
    });

    const button = debugElement.query(By.css('[data-testid="button-unset"]'));
    button.nativeElement.click();
    fixture.detectChanges();
    
    expect(eventHandlerCalled).toBeTrue();
  });

  it('should fire add event when inactive', () => {

    component.isActive = false;

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    let eventHandlerCalled = false;
    component.onAdd.subscribe({
      next: () => {
        eventHandlerCalled = true;
      }
    });

    const button = debugElement.query(By.css('[data-testid="button-set"]'));
    button.nativeElement.click();
    fixture.detectChanges();
    
    expect(eventHandlerCalled).toBeTrue();
  });

});
