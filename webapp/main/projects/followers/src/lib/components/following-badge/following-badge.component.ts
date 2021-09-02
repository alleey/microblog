import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { OidcAuthService } from 'auth-oidc';
import { Subscription } from 'rxjs';
import { FollowsModel, FollowsResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'following-badge',
  templateUrl: './following-badge.component.html',
  styleUrls: ['./following-badge.component.css']
})
export class FollowingBadgeComponent implements OnInit, OnDestroy {

  @Input("userid") userId: string = "";
  @Input() userName: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  item?: FollowsModel;
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(private service: FollowingService, private authService: OidcAuthService) { }

  ngOnInit(): void { 
    this.authService.userSubject.subscribe(profile => {
      this.checkStatus();
    });
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ next: () => this.checkStatus() })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get isActive(): boolean {
    return this.item?.userId != undefined;
  }

  responseHandler = {
    next: (result: FollowsResponseModel) => {
      this.item = result;
      this.loading = false;
      console.log(result);

    },
    error: (err: any) => {
      this.loading = false;
      console.log(err.message);
    }
  };

  checkStatus() {
    this.service.findFollowing("", "", this.userId).subscribe(this.responseHandler);
  }

  follow(): void {
    this.service.follow("", "", this.userId).subscribe(this.responseHandler);
  }

  unfollow(): void {
    if(this.item)
      this.service.unfollow("", "", this.item!.userId).subscribe({
        next: () => {
          this.item = undefined;
        },
        error: (err: any) => {
          console.log(err.message);
        }
      });
  }
}
