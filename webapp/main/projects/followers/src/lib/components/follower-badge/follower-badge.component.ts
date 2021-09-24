import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewModelHolder } from 'utils';
import { FollowsResponseModel } from '../../models/follows';
import { FollowingService } from '../../services/following.service';

@Component({
  selector: 'follower-badge',
  templateUrl: './follower-badge.component.html',
  styleUrls: ['./follower-badge.component.css']
})
export class FollowerBadgeComponent implements OnInit, OnDestroy {

  @Input("userid") paramUserId: string = "";
  @Input() activeControlTemplate: TemplateRef<any> | undefined;
  @Input() inactiveControlTemplate: TemplateRef<any> | undefined;

  userId?: string;
  viewModel = new ViewModelHolder<FollowsResponseModel>();
  subscription: Subscription = new Subscription();

  constructor(
    private service: FollowingService, 
    private activatedRoute: ActivatedRoute) 
    { }

  ngOnInit(): void { 
    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = params.get("userId") ?? this.paramUserId;
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
    return this.viewModel.Model?.userId != undefined;
  }

  checkStatus() {
    this.service
      .findFollower("", "", this.userId!)
      .subscribe(this.viewModel.expectModel());
  }
}
