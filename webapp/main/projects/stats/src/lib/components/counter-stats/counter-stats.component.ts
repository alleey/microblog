import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
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

  stats?: CounterStatisticsResponseModel;
  loading: boolean = false;
  subscription: Subscription = new Subscription();

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

  get hasValue(): boolean {
    return !!this.stats;
  }

  get statistics(): CounterStatisticsResponseModel {
    return !!this.stats ? this.stats : {
      counter: this.counterId,
      statistics: {
        count:0, min:0, max:0, avg: 0, sum:0
      }
    }
  }

  responseHandler = {
    next: (result: CounterStatisticsResponseModel) => {
      this.stats = result;
      this.loading = false;
      console.log(result);
    },
    error: (err: any) => {
      this.loading = false;
      console.log(err.message);
    }
  };

  checkStatus() {
    this.service.getCounterStatistics("", this.counterId).subscribe(this.responseHandler);
  }

  public set(): void {
    this.service.setCounter("", this.counterId, this.counterValue).subscribe({
      error: (err: any) => {
        this.loading = false;
        console.log(err.message);
      }
    });
  }

  public unset(): void {
    this.service.unsetCounter("", this.counterId).subscribe({
      error: (err: any) => {
        this.loading = false;
        console.log(err.message);
      }
    });
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
