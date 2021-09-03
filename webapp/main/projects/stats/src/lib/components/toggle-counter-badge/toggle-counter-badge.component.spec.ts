import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleCounterBadgeComponent } from './toggle-counter-badge.component';

describe('ToggleCounterBadgeComponent', () => {
  let component: ToggleCounterBadgeComponent;
  let fixture: ComponentFixture<ToggleCounterBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleCounterBadgeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleCounterBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
