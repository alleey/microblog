import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService, Profile } from '../services/auth.service';

@Directive({
  selector: '[authRequireRole]'
})
export class RequireRoleDirective {

  private profile?: Profile = undefined;
  private thenRef: TemplateRef<any>|undefined;
  private elseRef: TemplateRef<any>|undefined;
  private matchingRoles: boolean = false;
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
  set authRequireRole(role: string) {
    const roles: string[] = this.profile?.roles;
    this.matchingRoles = !!roles?.find(x => x.toLowerCase() === role.toLowerCase());
    this.updateView();
  }

  @Input()
  set authRequireRoleDifferent(value: 'yes' | 'no') {
    this.invert = value;
    this.updateView();
  }

  @Input()
  set authRequireRoleElse(ref: TemplateRef<any>) {
    this.elseRef = ref;
    this.updateView();
  }

  @Input()
  set authRequireRoleThen(ref: TemplateRef<any>) {
    this.thenRef = ref;
    this.updateView();
  }

  updateView() : void {

    const show = (this.matchingRoles && this.invert === 'no') || 
                 (!this.matchingRoles && this.invert === 'yes');

    this.viewContainer.clear();

    if (show) {
      this.viewContainer.createEmbeddedView(
        !!this.thenRef ? this.thenRef : this.templateRef, { $implicit: this.profile });
    } 
    else if (!!this.elseRef) {
      this.viewContainer.createEmbeddedView(this.elseRef);
    }
  }
}
