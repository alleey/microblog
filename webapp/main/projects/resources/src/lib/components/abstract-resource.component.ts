import { Directive, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ViewModelHolder } from 'utils';
import { ResourceResponseModel } from '../models/resource';
import { ResourcesService } from '../services/resources.service';

@Directive()
export abstract class AbstractResourceComponent implements OnInit, OnDestroy, OnChanges {

  @Input() resource: string = "";
  @Input() key: string = "";
  @Input() contentType: string = "";

  viewModel = new ViewModelHolder<ResourceResponseModel>();
  destroyed$ = new Subject();
  subscription = new Subscription();
  salt = Math.random();

  constructor(private service: ResourcesService) { }

  ngOnInit(): void { 
    this.checkStatus();
    // Requery when the backend data changes
    this.subscription.add(
      this.service.onChange.subscribe({ 
        next: (notif) => {
          if(notif.resource === this.resource && notif.key === this.key)
            this.checkStatus();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const changed = (changes['resource']) || (changes['key']);
    if(changed) {
      this.checkStatus();
    }
  }

  get hasValue(): boolean {
    return this.viewModel.hasValue;
  }

  get resourceModel(): ResourceResponseModel | undefined {
    return this.viewModel.Model;
  }

  get downloadLink(): string | undefined {
    const href = this.viewModel.Model?._links?.download?.href;
    return !!href ? `${href}?${this.salt}` : undefined;
  }

  public upload(file: File): void {
    if(!this.viewModel.hasValue) {
      this.service
        .create("", this.resource, this.key, this.contentType, file)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectModel());
    } else {
      this.service
        .update("", this.resource, this.key, this.contentType, file)
        .pipe(takeUntil(this.destroyed$))
        .subscribe(this.viewModel.expectNothing({
          nextObserver: {
            next: () => {
              this.salt = Math.random();
            }
          }
        }));
    }
  }

  public delete(): void {
    this.service
      .delete("", this.resource, this.key)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectUndefined());
  }

  checkStatus() {
    this.service
      .getResource("", this.resource, this.key)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(this.viewModel.expectModel());
  }
}
