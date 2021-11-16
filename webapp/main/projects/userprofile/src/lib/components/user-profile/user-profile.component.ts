import { Component } from '@angular/core';
import { AbstractUserProfileComponent } from '../abstract-user-profile.component';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent extends AbstractUserProfileComponent {

}
