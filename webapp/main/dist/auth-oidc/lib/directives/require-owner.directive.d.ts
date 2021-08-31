import { TemplateRef, ViewContainerRef } from '@angular/core';
import { OidcAuthService } from '../services/auth.service';
import * as i0 from "@angular/core";
export declare class RequireOwnerDirective {
    private authService;
    private templateRef;
    private viewContainer;
    private profile;
    private thenRef;
    private elseRef;
    private show;
    constructor(authService: OidcAuthService, templateRef: TemplateRef<any>, viewContainer: ViewContainerRef);
    set authRequireOwner(ownerId: string);
    set authRequireOwnerElse(ref: TemplateRef<any>);
    set authRequireOwnerThen(ref: TemplateRef<any>);
    updateView(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<RequireOwnerDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<RequireOwnerDirective, "[authRequireOwner]", never, { "authRequireOwner": "authRequireOwner"; "authRequireOwnerElse": "authRequireOwnerElse"; "authRequireOwnerThen": "authRequireOwnerThen"; }, {}, never>;
}
//# sourceMappingURL=require-owner.directive.d.ts.map