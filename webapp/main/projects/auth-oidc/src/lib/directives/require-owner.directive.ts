import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService, Profile } from '../services/auth.service';

@Directive({
  selector: '[authRequireOwner]'
})
export class RequireOwnerDirective {

  private profile?: Profile = undefined;
  private thenRef: TemplateRef<any>|undefined;
  private elseRef: TemplateRef<any>|undefined;
  private sameOwner: boolean = false;
  private invert: 'yes' | 'no' = 'no';

  constructor(private authService: OidcAuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) 
  { 
    this.authService.userSubject
      .subscribe(user => {
        this.profile = user?.profile;
        this.updateView();
      });
  }

  @Input()
  set authRequireOwner(ownerId: string) {
    this.sameOwner = (ownerId.toLowerCase() === this.profile?.sub.toLowerCase());
    this.updateView();
  }

  @Input()
  set authRequireOwnerDifferent(value: 'yes' | 'no') {
    this.invert = value;
    this.updateView();
  }

  @Input()
  set authRequireOwnerElse(ref: TemplateRef<any>) {
    this.elseRef = ref;
    this.updateView();
  }

  @Input()
  set authRequireOwnerThen(ref: TemplateRef<any>) {
    this.thenRef = ref;
    this.updateView();
  }

  updateView() : void {
    this.viewContainer.clear();

    const show = (this.sameOwner && this.invert === 'no') || 
                 (!this.sameOwner && this.invert === 'yes');
                 
    if (show) {
      this.viewContainer.createEmbeddedView(
        !!this.thenRef ? this.thenRef : this.templateRef, { $implicit: this.profile }
      );
    } 
    else if (!!this.elseRef) {
      this.viewContainer.createEmbeddedView(this.elseRef);
    }
  }

}
