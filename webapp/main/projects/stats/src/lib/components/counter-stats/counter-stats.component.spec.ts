import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterStatsComponent } from './counter-stats.component';

describe('CounterStatsComponent', () => {
  let component: CounterStatsComponent;
  let fixture: ComponentFixture<CounterStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
