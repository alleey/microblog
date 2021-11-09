import { AfterViewInit, Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { CounterResponseModel } from '../models/counter';
import { CountersService } from '../services/counters.service';

@Directive({
  selector: '[statsSetCounter]'
})
export class SetCounterDirective implements AfterViewInit {

  @Input('statsSetCounter') id: string = "";
  @Input('counterSetValue') value: number = 1;
  @Input('counterSetMode') mode: 'on' | 'off' | 'inc' | 'dec' = 'on';

  constructor(private service: CountersService) 
  { }
  
  ngAfterViewInit(): void {
    switch(this.mode) {
      case 'on': this.set(); break;
      case 'off': this.unset(); break;
      case 'inc': this.increment(this.value); break;
      case 'dec': this.increment(-this.value); break;
    }
  }

  set(): void {
    this.service.setCounter("", this.id, this.value).subscribe({
      next: (i: CounterResponseModel) => {},      
      error: (err: any) => {
        console.log(err.message);
      }
    });
  }

  increment(value: number): void {
    this.service.increment("", this.id, value).subscribe({
      next: (i: CounterResponseModel) => {},      
      error: (err: any) => {
        console.log(err.message);
      }
    });
  }

  unset(): void {
    this.service.unsetCounter("", this.id).subscribe({
      next: () => {},      
      error: (err: any) => {
        console.log(err.message);
      }
    });
  }
}
