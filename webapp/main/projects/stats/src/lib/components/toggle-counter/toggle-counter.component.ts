import { Component } from '@angular/core';
import { AbstractCounterComponent } from '../abstract-counter-component';

@Component({
  selector: 'toggle-counter',
  templateUrl: './toggle-counter.component.html',
  styleUrls: ['./toggle-counter.component.css']
})
export class ToggleCounterComponent extends AbstractCounterComponent {

  get isPositive(): boolean {
    return this.viewModel.hasValue && this.viewModel.Model!.value > 0;
  }
}
