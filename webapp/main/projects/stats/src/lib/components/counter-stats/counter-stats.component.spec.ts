import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { CountersService } from '../../services/counters.service';
import { CounterStatisticsResponseModel } from '../../models/counter-statistics';

import { CounterStatsComponent } from './counter-stats.component';
import { of, Subject, throwError } from 'rxjs';

describe('CounterStatsComponent', () => {
  let component: CounterStatsComponent;
  let fixture: ComponentFixture<CounterStatsComponent>;
  let service: jasmine.SpyObj<CountersService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<CountersService>('CounterService', 
      ['getCounterStatistics'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [CounterStatsComponent],
      providers: [
        { provide: CountersService, useValue: service }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterStatsComponent);
    component = fixture.componentInstance;
  });

  it('should fetch counter statistics', () => {

    const counterId = "test";
    const counterStats: CounterStatisticsResponseModel = {
      counter: counterId,
      statistics: { count: 100, min: 100, max: 100, sum: 100, avg: 100 }
    };

    service.getCounterStatistics.withArgs("", counterId).and.returnValue(of(counterStats));

    component.counterId = counterId;
    component.caption = "test";
    fixture.detectChanges();

    const { debugElement } = fixture;
    
    expect(component.hasValue).toBeTrue();
    expect(service.getCounterStatistics).toHaveBeenCalled();
    expect(debugElement.nativeElement.innerHTML).toContain(component.caption);
    expect(debugElement.nativeElement.innerHTML).toContain(component.counterValue);
  });

  it('should render unknown stats in case of error', () => {

    const counterId = "test";
    service.getCounterStatistics.withArgs("", counterId).and.returnValue(throwError(new Error("erro")));

    component.counterId = counterId;
    component.caption = "test";
    fixture.detectChanges();

    const { debugElement } = fixture;
    
    expect(component.hasValue).toBeFalse();
    expect(service.getCounterStatistics).toHaveBeenCalled();
    expect(debugElement.nativeElement.innerHTML).toContain(component.caption);
    expect(debugElement.nativeElement.innerHTML).toContain("UNK");
  });

  it('should refetch when service onChange is triggered', fakeAsync(() => {

    const counterId = "test";
    const counterStats: CounterStatisticsResponseModel = {
      counter: counterId,
      statistics: { count: 100, min: 100, max: 100, sum: 100, avg: 100 }
    };

    service.getCounterStatistics.withArgs("", counterId).and.returnValue(of(counterStats));

    component.counterId = counterId;
    fixture.detectChanges();

    service.onChange.next({});
    tick();
    fixture.detectChanges();

    expect(service.getCounterStatistics).toHaveBeenCalledTimes(2);
  }));
});
