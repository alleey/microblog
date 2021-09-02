import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { CounterResponseModel } from '../../models/counter';
import { CounterStatisticsModel } from '../../models/counter-statistics';
import { CountersService } from '../../services/counters.service';

@Component({
  selector: 'switch-counter',
  templateUrl: './switch-counter.component.html',
  styleUrls: ['./switch-counter.component.css']
})
export class SwitchCounterComponent implements OnInit {

  @Input() counterId: string = "";
  @Input() counterValue: number = 1;

  @Input() activeCaption: string = "";
  @Input() inactiveCaption: string = "";
  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  value: number = 0;
  loading: boolean = false;

  constructor(private service: CountersService) { }

  ngOnInit(): void { }

  get isActive(): boolean {
    return this.value > 0;
  }

  responseHandler = {
    next: (result: CounterResponseModel) => {
      this.value = result.value;
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

  toggle(): void {
    if(this.isActive)
    {
      this.service.unsetCounter("", this.counterId).subscribe({
        next: () => { this.value = 0; }
      });
    }
    else
    {
      this.service.setCounter("", this.counterId, this.counterValue).subscribe(this.responseHandler);
    }
  }
}
