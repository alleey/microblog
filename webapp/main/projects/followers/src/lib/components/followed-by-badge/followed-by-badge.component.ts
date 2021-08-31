import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { OidcAuthService } from 'auth-oidc';
import { FollowedByModel, FollowedByResponseModel } from '../../models/followed-by';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'followed-by-badge',
  templateUrl: './followed-by-badge.component.html',
  styleUrls: ['./followed-by-badge.component.css']
})
export class FollowedByBadgeComponent implements OnInit {

  @Input("userid") userId: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  item?: FollowedByModel;
  loading: boolean = false;

  constructor(private service: FollowingService, private authService: OidcAuthService) { 
    this.authService.userSubject.subscribe(profile => {
      this.checkStatus();
    });
  }

  ngOnInit(): void { }

  get isActive(): boolean {
    return this.item?.userId != undefined;
  }

  checkStatus() {
    this.service.followedByOne("", "", this.userId).subscribe({
      next: (result: FollowedByResponseModel) => {
        this.item = result;
        this.loading = false;
        console.log(result);
  
      },
      error: (err: any) => {
        this.loading = false;
        console.log(err.message);
      }
    });
  }
}
