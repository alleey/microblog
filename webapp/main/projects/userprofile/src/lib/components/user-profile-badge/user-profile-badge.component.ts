import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewModelHolder } from 'utils';
import { UserProfileModel, UserProfileResponseModel } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfileBadgeViewEvent } from '../user-profile-badge-view/user-profile-badge-view.component';

@Component({
  selector: 'user-profile-badge',
  templateUrl: './user-profile-badge.component.html',
  styleUrls: ['./user-profile-badge.component.css']
})
export class UserProfileBadgeComponent implements OnInit {

  @Input("userid") paramUserId?: string;
  @Input() contentTemplate: TemplateRef<any> | undefined;
  @Input() onSelect: (topic: UserProfileModel) => void = (item) => {};

  userId?: string;
  viewModel = new ViewModelHolder<UserProfileResponseModel>();

  constructor(
    private userProfileService: UserProfileService, 
    private activatedRoute: ActivatedRoute) 
  { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId") ?? this.paramUserId;
      this.fetchUserProfile(this.userId!);
    });
  }

  fetchUserProfile(userId: string): void {
    this.userId = userId;
    this.userProfileService
      .one("", this.userId)
      .subscribe(this.viewModel.expectModel());
  }

  get userProfileItem(): UserProfileModel {
    return this.viewModel.Model!;
  }

  handleViewEvent(evt: UserProfileBadgeViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }
}
