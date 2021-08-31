import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { OidcAuthService } from 'auth-oidc';
import { FollowingModel, FollowingResponseModel } from '../../models/following';
import { FollowingService, FollowRequest } from '../../services/following.service';

@Component({
  selector: 'following-badge',
  templateUrl: './following-badge.component.html',
  styleUrls: ['./following-badge.component.css']
})
export class FollowingBadgeComponent implements OnInit {

  @Input("userid") userId: string = "";
  @Input() userName: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  item?: FollowingModel;
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
    this.service.followingOne("", "", this.userId).subscribe({
      next: (result: FollowingResponseModel) => {
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

  follow(): void {
    const request: FollowRequest = {
      userId: this.userId,
      userName: this.userName,
      followedById: "",
      followedByName: ""
    };
    this.service.follow("", request).subscribe({
        error: (err: any) => {
          console.log(err.message);
        }
      });
  }

  unfollow(): void {
    if(this.item)
      this.service.unfollow("", "", this.item!.userId).subscribe({
        next: () => {},
        error: (err: any) => {
          console.log(err.message);
        }
      });
  }
}
