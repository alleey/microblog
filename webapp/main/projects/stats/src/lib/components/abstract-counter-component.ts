import { Directive, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { CounterResponseModel } from '../models/counter';
import { CountersService } from '../services/counters.service';

@Directive()
export abstract class AbstractCounterComponent implements OnInit, OnDestroy {

  @Input() counterId: string = "";
  @Input() counterValue: number = 1;

  @Input() caption: string = "";
  @Input() displayKind: string = "primary";
  @Input() activeCaption: string = "";
  @Input() inactiveCaption: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  protected viewModel = new ViewModelHolder<CounterResponseModel>();
  destroyed$ = new Subject();
  subscription = new Subscription();

  constructor(protected service: CountersService) { }

  ngOnInit(): void { 
    this.checkStatus();
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () => this.checkStatus() })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  protected checkStatus() {
    this.service
      .getCounter("", this.counterId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  public set(): void {
    this.service
      .setCounter("", this.counterId, this.counterValue)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }

  public unset(): void {
    this.service
      .unsetCounter("", this.counterId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectUndefined());
  }

  // toggle(): void {

  //   if(this.isActive) {
  //     this.service.unsetCounter("", this.counterId).subscribe({
  //       next: () => { this.value = 0; }
  //     });
  //   } else {
  //     this.service.setCounter("", this.counterId, this.counterValue).subscribe(this.responseHandler);
  //   }
  // }
}

