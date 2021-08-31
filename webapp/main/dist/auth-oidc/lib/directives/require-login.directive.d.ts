import { TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
export declare class RequireLoginDirective {
    private authService;
    private templateRef;
    private viewContainer;
    private profile;
    private thenRef;
    private elseRef;
    constructor(authService: OidcAuthService, templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    set authRequireLogin(show: boolean);
    set authRequireLoginElse(ref: TemplateRef<any>);
    set authRequireLoginThen(ref: TemplateRef<any>);
    updateView(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequireLoginDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RequireLoginDirective, "[authRequireLogin]", never, { "authRequireLogin": "authRequireLogin"; "authRequireLoginElse": "authRequireLoginElse"; "authRequireLoginThen": "authRequireLoginThen"; }, {}, never>;
}
//# sourceMappingURL=require-login.directive.d.ts.map