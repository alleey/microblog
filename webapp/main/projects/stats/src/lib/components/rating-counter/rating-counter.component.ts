import { Component, Input, OnInit } from '@angular/core';
import { AbstractCounterComponent } from '../abstract-counter-component';

@Component({
  selector: 'lib-rating-counter',
  templateUrl: './rating-counter.component.html',
  styleUrls: ['./rating-counter.component.css']
})
export class RatingCounterComponent extends AbstractCounterComponent {

  @Input() maxValue: number = 5;

  get isActive(): boolean {
    return this.viewModel.hasValue;
  }

}
