import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { CountersService } from '../services/counters.service';
import { SetCounterDirective } from './set-counter.directive';

@Component({
  template: `
  <div [statsSetCounter]="'willbeset'" [counterSetMode]="'on'"></div>
  <div [statsSetCounter]="'willbeunset'" [counterSetMode]="'off'"></div>
  `
})
class HostComponent {}

describe('SetCounterDirective', () => {
  let fixture: ComponentFixture<HostComponent>;
  let service: jasmine.SpyObj<CountersService>;

  beforeEach(async () => {

    service = jasmine.createSpyObj<CountersService>('CounterService', 
      ['getCounter', 'setCounter', 'unsetCounter'], {
        onChange: new Subject()
      }
    );

    await TestBed.configureTestingModule({
      declarations: [HostComponent, SetCounterDirective],
      providers: [
        { provide: CountersService, useValue: service }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
  });

  it('should set counter', () => {

    service.setCounter.withArgs("", "willbeset", 1).and.returnValue(of());
    service.unsetCounter.withArgs("", "willbeunset").and.returnValue(of(undefined));
    fixture.detectChanges();

    expect(service.setCounter).toHaveBeenCalled();
  });

  it('should unset counter', () => {

    service.setCounter.withArgs("", "willbeset", 1).and.returnValue(of());
    service.unsetCounter.withArgs("", "willbeunset").and.returnValue(of(undefined));
    fixture.detectChanges();

    expect(service.unsetCounter).toHaveBeenCalled();
  });
});

