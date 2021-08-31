import { EventEmitter, OnInit, TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class AlertComponent implements OnInit {
    minimal: boolean;
    dismissable: boolean;
    title: string;
    kind: string;
    controlTemplate: TemplateRef<any> | undefined;
    onClosed: EventEmitter<number>;
    constructor();
    ngOnInit(): void;
    fireOnClose(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AlertComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AlertComponent, "utils-alert", never, { "minimal": "minimal"; "dismissable": "dismissable"; "title": "title"; "kind": "kind"; "controlTemplate": "controlTemplate"; }, { "onClosed": "onClosed"; }, never, ["*"]>;
}
//# sourceMappingURL=alert.component.d.ts.map