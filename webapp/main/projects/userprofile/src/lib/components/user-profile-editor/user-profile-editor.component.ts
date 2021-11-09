import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { UserProfileResponseModel } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';
import { UserProfileServiceConfig, UserProfileServiceConfigToken } from '../../config/config';
import { Location } from '@angular/common';

@Component({
  selector: 'user-profile-editor',
  templateUrl: './user-profile-editor.component.html',
  styleUrls: ['./user-profile-editor.component.css']
})
export class UserProfileEditorComponent implements OnInit {

  @Input("userId") paramUserId?: string;
  @Input() updateMode: boolean = true;
  @Input() headerTemplate: TemplateRef<any> | undefined;

  form!: FormGroup;
  userId?: string;
  viewModel = new ViewModelHolder<UserProfileResponseModel>();
  destroyed$ = new Subject();

  constructor(
    @Inject(UserProfileServiceConfigToken) private config: UserProfileServiceConfig,
    private service: UserProfileService,
    private location: Location,
    private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.form = new FormGroup({
      "about": new FormControl("", [
        Validators.maxLength(this.config.maxAboutLength)
      ])
    });

    this.activatedRoute.paramMap.subscribe(params => {
      this.userId = (params.get("userId") ?? this.paramUserId);
      if(this.isUpdateMode)
        this.fetchUserProfile(this.userId!);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  get about() { return this.form.get('about'); }
  get isUpdateMode(): boolean { return this.updateMode && this.userId !== undefined;}
  get userProfile(): UserProfileResponseModel|undefined { return this.viewModel.Model; }

  updateForm(): void {
    if(this.isUpdateMode) {
      this.userId = this.viewModel.Model?.id;
      this.about!.setValue (this.userProfile?.about);
    } else {

    }
  }

  fetchUserProfile(id: string): void {
    this.service
      .one("", id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: UserProfileResponseModel) => this.updateForm()
        }
      }));
  }

  updateUserProfile(): void {
    this.service
      .update("", this.userId!, this.about?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectNothing());
  }

  cancel(): void {
    this.location.back();
  }
}
