import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CounterResponseModel } from '../../models/counter';
import { CountersService } from '../../services/counters.service';

@Component({
  selector: 'toggle-counter-badge',
  templateUrl: './toggle-counter-badge.component.html',
  styleUrls: ['./toggle-counter-badge.component.css']
})
export class ToggleCounterBadgeComponent implements OnInit {

  @Input() counterId: string = "";
  @Input() counterValue: number = 1;
  @Input() caption: string = "";
  @Input() kind: string = "primary";
  @Input() activeCaption: string = "";
  @Input() inactiveCaption: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  stats?: CounterResponseModel;
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

  get isPositive(): boolean {
    return !!this.stats && this.stats.value > 0;
  }

  responseHandler = {
    next: (result: CounterResponseModel) => {
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
    this.service.getCounter("", this.counterId).subscribe(this.responseHandler);
  }

  public set(): void {
    this.service.setCounter("", this.counterId, this.counterValue).subscribe(this.responseHandler);
  }

  public unset(): void {
    this.service.unsetCounter("", this.counterId).subscribe({
      next: () => {
        this.stats = undefined;
        this.loading = false;
      },      
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
