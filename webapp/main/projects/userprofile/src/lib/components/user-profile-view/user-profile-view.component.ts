import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { UserProfileModel } from '../../models/user-profile';

export type UserProfileViewEvent = ViewEvent<UserProfileModel>;

@Component({
  selector: 'user-profile-view',
  templateUrl: './user-profile-view.component.html',
  styleUrls: ['./user-profile-view.component.css']
})
export class UserProfileViewComponent implements OnInit {

  @Input() userProfile?: UserProfileModel;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() noContentTemplate: TemplateRef<any> | undefined;

  @Output() onEvent = new EventEmitter<UserProfileViewEvent>();


  constructor() { }

  ngOnInit(): void { }

  get userId(): string | undefined {
    return this.userProfile?.id;
  }

  selectItem(item: UserProfileModel, opcode: string): void {
    this.onEvent.emit({
      opcode: opcode,
      item: item
    });
  }
}
