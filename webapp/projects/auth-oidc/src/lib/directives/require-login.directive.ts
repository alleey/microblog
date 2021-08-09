import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService } from '../services/auth.service';

@Directive({
  selector: '[authRequireLogin]'
})
export class RequireLoginDirective {

  private profile: any = undefined;
  private thenRef: TemplateRef<any>|undefined;
  private elseRef: TemplateRef<any>|undefined;

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
  set authRequireLogin(show: boolean) {
    this.updateView();
  }

  @Input()
  set authRequireLoginElse(ref: TemplateRef<any>) {
    this.elseRef = ref;
    this.updateView();
  }

  @Input()
  set authRequireLoginThen(ref: TemplateRef<any>) {
    this.thenRef = ref;
    this.updateView();
  }

  updateView() : void {
    this.viewContainer.clear();

    if (this.profile) {
      this.viewContainer.createEmbeddedView(
        !!this.thenRef ? this.thenRef : this.templateRef, {
        $implicit: this.profile,
      });
    } 
    else if (!!this.elseRef) {
      this.viewContainer.createEmbeddedView(this.elseRef);
    }
  }
}
