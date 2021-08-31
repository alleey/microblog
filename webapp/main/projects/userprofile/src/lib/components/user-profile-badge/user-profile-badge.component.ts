import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  response : UserProfileResponseModel|null;
  errorDesc: any = "";
  loading: boolean = false;

  constructor(
    private userProfileService: UserProfileService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) 
  { 
    this.response = null;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params.userId ?? this.paramUserId;
      this.fetchUserProfile(this.userId!);
    });
  }

  fetchUserProfile(userId: string): void {
    this.userId = userId;

    this.loading = true;
    this.userProfileService.one("", this.userId)
      .subscribe(
      {
        next: (result: UserProfileResponseModel) => {
          this.response = result;
          this.loading = false;
        },
        error: (err: any) => {
          this.errorDesc = err.message;
          this.loading = false;
          console.log(this.errorDesc);
        }
      }
    );
  }

  get userProfileItem(): UserProfileModel {
    return this.response!;
  }

  handleViewEvent(evt: UserProfileBadgeViewEvent) {
    switch(evt.opcode) {
      case 'select': this.onSelect(evt.item); break;
    }
  }
}
