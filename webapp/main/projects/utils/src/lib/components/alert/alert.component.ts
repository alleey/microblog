import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'utils-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  @Input() minimal: boolean = false;
  @Input() dismissable: boolean = false;
  @Input() title: string = "Oops!";
  @Input() kind: string = "danger";
  @Input() controlTemplate: TemplateRef<any> | undefined;

  @Output() onClosed = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void { }

  fireOnClose(): void {
    this.onClosed.emit();
  }
}
