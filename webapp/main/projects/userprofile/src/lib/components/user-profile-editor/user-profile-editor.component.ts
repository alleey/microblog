import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { UserProfileServiceConfig, UserProfileServiceConfigToken } from '../../config/config';
import { UserProfileResponseModel } from '../../models/user-profile';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'user-profile-editor',
  templateUrl: './user-profile-editor.component.html',
  styleUrls: ['./user-profile-editor.component.css']
})
export class UserProfileEditorComponent implements OnInit, OnDestroy, OnChanges {

  @Input() userId?: string;
  @Input() updateMode: boolean = true;

  form!: FormGroup;
  viewModel = new ViewModelHolder<UserProfileResponseModel>();
  destroyed$ = new Subject();

  constructor(
    @Inject(UserProfileServiceConfigToken) private config: UserProfileServiceConfig,
    private service: UserProfileService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      "about": new FormControl("", [
        Validators.maxLength(this.config.maxAboutLength)
      ])
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['userId']);
    if(changed) {
      this.fetchUserProfile(this.userId!);
    }
  }

  get isUpdateMode(): boolean { return this.updateMode && this.userId !== undefined;}
  get about() { return this.form.get('about'); }
  get userProfile(): UserProfileResponseModel|undefined { return this.viewModel.Model; }

  updateForm(i: UserProfileResponseModel): void {
    if(this.isUpdateMode) {
      this.userId = i.id;
      this.about!.setValue (i.about);
    } else {

    }
  }

  fetchUserProfile(id: string): void {
    this.service
      .one("", id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel({
        nextObserver: {
          next: (i: UserProfileResponseModel) => this.updateForm(i)
        }
      }));
  }

  updateUserProfile(): void {
    this.service
      .update("", this.userId!, this.about?.value)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectNothing());
  }
}
