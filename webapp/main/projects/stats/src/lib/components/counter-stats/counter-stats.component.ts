import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { CounterStatisticsResponseModel } from '../../models/counter-statistics';
import { CountersService } from '../../services/counters.service';


@Component({
  selector: 'counter-stats',
  templateUrl: './counter-stats.component.html',
  styleUrls: ['./counter-stats.component.css']
})
export class CounterStatsComponent implements OnInit, OnDestroy {

  @Input() counterId: string = "";
  @Input() counterValue: number = 1;

  @Input() caption: string = "";
  @Input() displayKind: string = "primary";
  @Input() displayStats: 'count' | 'sum' | 'avg' | 'min' | 'max' = 'count';

  @Input() controlTemplate: TemplateRef<any> | undefined;

  viewModel = new ViewModelHolder<CounterStatisticsResponseModel>();
  destroyed$ = new Subject();
  subscription = new Subscription();

  constructor(private service: CountersService) { }

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

  get hasValue() { return this.viewModel.hasValue; }

  get value() {
    switch(this.displayStats) {
      case 'count': return this.viewModel.Model!.statistics.count;
      case 'sum': return this.viewModel.Model!.statistics.sum;
      case 'avg': return this.viewModel.Model!.statistics.avg;
      case 'min': return this.viewModel.Model!.statistics.min;
      case 'max': return this.viewModel.Model!.statistics.max;
    }
    return "";
  }

  checkStatus() {
    this.service
      .getCounterStatistics("", this.counterId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }
}
