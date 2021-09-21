import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService, User } from '../services/auth.service';

@Directive({
  selector: '[authRequireLogin]'
})
export class RequireLoginDirective {

  private user: User|null = null;
  private thenRef: TemplateRef<any>|undefined;
  private elseRef: TemplateRef<any>|undefined;
  private show: 'yes' | 'no' = 'yes';

  constructor(private authService: OidcAuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) 
  { 
    this.authService.userSubject
      .subscribe(user => {
        this.user = user;
        this.updateView();
      });
  }

  @Input()
  set authRequireLogin(show: 'yes' | 'no') {
    this.show = show;
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
    const show = (this.user && this.show === 'yes') || (!this.user && this.show === 'no');
    if (show) {
      this.viewContainer.createEmbeddedView(
        this.thenRef ? this.thenRef : this.templateRef, { $implicit: this.user });
    } 
    else if (this.elseRef) {
      this.viewContainer.createEmbeddedView(this.elseRef);
    }
  }
}
