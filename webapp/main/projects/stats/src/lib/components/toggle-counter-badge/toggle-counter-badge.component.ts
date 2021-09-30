import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewModelHolder } from 'utils';
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

  viewModel = new ViewModelHolder<CounterResponseModel>();
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

  get isPositive(): boolean {
    return this.viewModel.hasValue && this.viewModel.Model!.value > 0;
  }

  checkStatus() {
    this.service
      .getCounter("", this.counterId)
      .subscribe(this.viewModel.expectModel());
  }

  public set(): void {
    this.service
      .setCounter("", this.counterId, this.counterValue)
      .subscribe(this.viewModel.expectModel());
  }

  public unset(): void {
    this.service
      .unsetCounter("", this.counterId)
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
