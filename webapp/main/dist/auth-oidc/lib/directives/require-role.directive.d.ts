import { TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
export declare class RequireRoleDirective {
    private authService;
    private templateRef;
    private viewContainer;
    private profile;
    private thenRef;
    private elseRef;
    private show;
    constructor(authService: OidcAuthService, templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    set authRequireRole(role: string);
    set authRequireRoleElse(ref: TemplateRef<any>);
    set authRequireRoleThen(ref: TemplateRef<any>);
    updateView(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequireRoleDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RequireRoleDirective, "[authRequireRole]", never, { "authRequireRole": "authRequireRole"; "authRequireRoleElse": "authRequireRoleElse"; "authRequireRoleThen": "authRequireRoleThen"; }, {}, never>;
}
//# sourceMappingURL=require-role.directive.d.ts.map