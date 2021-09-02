import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'utils-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.css']
})
export class BadgeComponent implements OnInit {

  @Input() isActive: boolean = false;
  @Input() activeCaption: string = "";
  @Input() inactiveCaption: string = "";
  @Input() kind: string = "primary";

  @Input() context: any;
  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  @Output() onAdd = new EventEmitter();
  @Output() onRemove = new EventEmitter();

  constructor() { }

  ngOnInit(): void {}

  fireAdd(): void {
    this.onAdd.emit();
  }

  fireRemove(): void {
    this.onRemove.emit();
  }
}
