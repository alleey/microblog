import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BadgeComponent implements OnInit {
    isActive: boolean;
    activeCaption: string;
    inactiveCaption: string;
    kind: string;
    activeControlTemplate: TemplateRef<any> | undefined;
    inactiveControlTemplate: TemplateRef<any> | undefined;
    onAdd: EventEmitter<any>;
    onRemove: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    fireAdd(): void;
    fireRemove(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BadgeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<BadgeComponent, "utils-badge", never, { "isActive": "isActive"; "activeCaption": "activeCaption"; "inactiveCaption": "inactiveCaption"; "kind": "kind"; "activeControlTemplate": "activeControlTemplate"; "inactiveControlTemplate": "inactiveControlTemplate"; }, { "onAdd": "onAdd"; "onRemove": "onRemove"; }, never, ["*"]>;
}
//# sourceMappingURL=badge.component.d.ts.map