import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';
import { of, Subject } from 'rxjs';
import { BadgeComponent } from 'utils';
import { CounterResponseModel } from '../../models/counter';
import { CountersService } from '../../services/counters.service';
import { ToggleCounterBadgeComponent } from './toggle-counter-badge.component';


describe('ToggleCounterBadgeComponent', () => {
  let component: ToggleCounterBadgeComponent;
  let fixture: ComponentFixture<ToggleCounterBadgeComponent>;
  let service: jasmine.SpyObj<CountersService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<CountersService>('CounterService',
      ['getCounter', 'setCounter', 'unsetCounter'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [
        ToggleCounterBadgeComponent,
        MockComponent(BadgeComponent)
      ],
      providers: [
        { provide: CountersService, useValue: service }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleCounterBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should render active when counter is positive', () => {

    const counterId = "test";
    const response: CounterResponseModel = {
      counter: counterId,
      owner: "me",
      value: 1
    };

    service.getCounter.withArgs("", counterId).and.returnValue(of(response));

    component.counterId = counterId;
    component.activeCaption = "test";
    fixture.detectChanges();

    const { debugElement } = fixture;

    expect(component.isPositive).toBeTrue();
    expect(debugElement.nativeElement.innerHTML).toContain(component.activeCaption);
  });

  it('should render inactive when counter is negative', () => {

    const counterId = "test";
    const response: CounterResponseModel = {
      counter: counterId,
      owner: "me",
      value: 0
    };

    service.getCounter.withArgs("", counterId).and.returnValue(of(response));

    component.counterId = counterId;
    component.inactiveCaption = "failed test";
    fixture.detectChanges();

    const { debugElement } = fixture;

    expect(component.isPositive).toBeFalse();
    expect(debugElement.nativeElement.innerHTML).toContain(component.inactiveCaption);
  });

  it('should unset counter when active and clicked', fakeAsync(() => {

    const counterId = "test";
    const response: CounterResponseModel = {
      counter: counterId,
      owner: "me",
      value: 1
    };
    service.getCounter.withArgs("", counterId).and.returnValue(of(response));
    service.unsetCounter.withArgs("", counterId).and.returnValue(of(undefined));

    component.counterId = counterId;
    fixture.detectChanges();

    const { debugElement } = fixture;
    const badge = debugElement.query(By.css('utils-badge')).componentInstance;
    badge.onRemove.emit();

    tick();
    fixture.detectChanges();

    expect(service.unsetCounter).toHaveBeenCalled();
  }));

  it('should set counter when inactive and clicked', fakeAsync(() => {

    const counterId = "test";
    const response: CounterResponseModel = {
      counter: counterId,
      owner: "me",
      value: 0
    };
    service.getCounter.withArgs("", counterId).and.returnValue(of(response));
    service.setCounter.withArgs("", counterId, 1).and.returnValue(of(response));

    component.counterId = counterId;
    fixture.detectChanges();

    const { debugElement } = fixture;
    const badge = debugElement.query(By.css('utils-badge')).componentInstance;
    badge.onAdd.emit();

    tick();
    fixture.detectChanges();

    expect(service.setCounter).toHaveBeenCalled();
  }));


  it('should refetch when service onChange is triggered', fakeAsync(() => {

    const counterId = "test";
    const response: CounterResponseModel = {
      counter: counterId,
      owner: "me",
      value: 1
    };

    service.getCounter.withArgs("", counterId).and.returnValue(of(response));

    component.counterId = counterId;
    fixture.detectChanges();

    service.onChange.next({});
    tick();
    fixture.detectChanges();

    expect(service.getCounter).toHaveBeenCalledTimes(2);
  }));

});
