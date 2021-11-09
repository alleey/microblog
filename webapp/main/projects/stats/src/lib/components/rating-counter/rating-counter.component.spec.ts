import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingCounterComponent } from './rating-counter.component';

describe('RatingCounterComponent', () => {
  let component: RatingCounterComponent;
  let fixture: ComponentFixture<RatingCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
