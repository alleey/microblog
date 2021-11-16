import { Component } from '@angular/core';
import { AbstractUserProfileComponent } from '../abstract-user-profile.component';

@Component({
  selector: 'user-profile-badge',
  templateUrl: './user-profile-badge.component.html',
  styleUrls: ['./user-profile-badge.component.css']
})
export class UserProfileBadgeComponent extends AbstractUserProfileComponent {
}
