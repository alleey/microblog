import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ViewModelHolder } from 'utils';
import { Subscription } from 'rxjs';
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
  @Input() kind: string = "primary";

  @Input() controlTemplate: TemplateRef<any> | undefined;

  viewModel = new ViewModelHolder<CounterStatisticsResponseModel>();
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
  }

  get hasValue() { return this.viewModel.hasValue; }

  checkStatus() {
    this.service
      .getCounterStatistics("", this.counterId)
      .subscribe(this.viewModel.expectModel());
  }
}
