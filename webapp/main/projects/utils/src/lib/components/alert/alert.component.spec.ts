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
    component.dismissable = true;

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    const closeButton = debugElement.query(
      By.css('[data-dismiss="alert"]')
    );    
    expect(closeButton).toBeTruthy();
  });

  it('should not render dismissable', () => {
    component.dismissable = false;

    fixture.detectChanges();
    const { debugElement } = fixture;
    
    const closeButton = debugElement.query(
      By.css('[data-dismiss="alert"]')
    );    
    expect(closeButton).toBeFalsy();
  });
});
