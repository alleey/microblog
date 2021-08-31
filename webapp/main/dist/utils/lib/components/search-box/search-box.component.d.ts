import { ElementRef, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import * as i0 from "@angular/core";
export declare class SearchBoxComponent implements OnInit, OnDestroy {
    searchBox: ElementRef;
    debounceTime: number;
    onApplyFilter: EventEmitter<string>;
    filter$: Subject<string>;
    subscription: Subscription;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    doSearch(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SearchBoxComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SearchBoxComponent, "utils-search-box", never, { "debounceTime": "debounceTime"; }, { "onApplyFilter": "onApplyFilter"; }, never, never>;
}
//# sourceMappingURL=search-box.component.d.ts.map