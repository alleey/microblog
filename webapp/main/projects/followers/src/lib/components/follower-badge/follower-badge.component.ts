import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { OidcAuthService } from 'auth-oidc';
import { Subscription } from 'rxjs';
import { FollowsModel, FollowsResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'follower-badge',
  templateUrl: './follower-badge.component.html',
  styleUrls: ['./follower-badge.component.css']
})
export class FollowerBadgeComponent implements OnInit, OnDestroy {

  @Input("userid") userId: string = "";

  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  item?: FollowsModel;
  loading: boolean = false;
  subscription: Subscription = new Subscription();

  constructor(
    private service: FollowingService, 
    private authService: OidcAuthService) 
  { }

  ngOnInit(): void { 
    this.authService.userSubject.subscribe(user => {
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

  checkStatus() {
    this.service.findFollower("", "", this.userId).subscribe({
      next: (result: FollowsResponseModel) => {
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
