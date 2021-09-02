import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService } from '../services/auth.service';

@Directive({
  selector: '[authRequireOwner]'
})
export class RequireOwnerDirective {

  private profile: any = undefined;
  private thenRef: TemplateRef<any>|undefined;
  private elseRef: TemplateRef<any>|undefined;
  private show: boolean = false;
  private invert: 'yes' | 'no' = 'no';

  constructor(private authService: OidcAuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) 
  { 
    this.authService.userSubject
      .subscribe(profile => {
        this.profile = profile;
        this.updateView();
      });
  }

  @Input()
  set authRequireOwner(ownerId: string) {
    const show = (ownerId.toLowerCase() === this.profile?.sub.toLowerCase());
    if (show != this.show) {
      this.show = show;
      this.updateView();
    }
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

    const show = this.profile && (this.invert === 'yes' ? !this.show : this.show);
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
