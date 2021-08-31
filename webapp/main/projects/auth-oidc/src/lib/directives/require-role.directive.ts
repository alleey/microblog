import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService } from '../services/auth.service';

@Directive({
  selector: '[authRequireRole]'
})
export class RequireRoleDirective {

  private profile: any = undefined;
  private thenRef: TemplateRef<any>|undefined;
  private elseRef: TemplateRef<any>|undefined;
  private show: boolean = false;

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
  set authRequireRole(role: string) {
    const roles: string[] = this.profile?.roles;
    const show = !!roles?.find(x => x.toLowerCase() === role.toLowerCase());
    if (show != this.show) {
      this.show = show;
      this.updateView();
    }
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
    this.viewContainer.clear();

    if (this.show) {
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
