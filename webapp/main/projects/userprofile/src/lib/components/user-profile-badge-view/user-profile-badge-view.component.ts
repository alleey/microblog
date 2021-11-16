import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ViewEvent } from 'utils';
import { UserProfileModel } from '../../models/user-profile';

export type UserProfileBadgeViewEvent = ViewEvent<UserProfileModel>;

@Component({
  selector: 'user-profile-badge-view',
  templateUrl: './user-profile-badge-view.component.html',
  styleUrls: ['./user-profile-badge-view.component.css']
})
export class UserProfileBadgeViewComponent implements OnInit {

  @Input() userProfile?: UserProfileModel;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() noContentTemplate: TemplateRef<any> | undefined;
  @Input() context: any = {};

  @Output() onEvent = new EventEmitter<UserProfileBadgeViewEvent>();

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
