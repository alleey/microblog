import { EventEmitter, OnInit } from '@angular/core';
import { PageModel } from '../../models/page';
import * as i0 from "@angular/core";
export declare class PagerComponent implements OnInit {
    prevNextLinks: boolean;
    maxPageLinks: number;
    onSelectPage: EventEmitter<number>;
    pageList: Array<number>;
    currentPage: PageModel | undefined;
    set page(value: PageModel | undefined);
    get page(): PageModel | undefined;
    get numberOfPages(): number;
    get previousPage(): number;
    get nextPage(): number;
    ngOnInit(): void;
    selectItem(page: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<PagerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PagerComponent, "utils-pager", never, { "prevNextLinks": "prevNextLinks"; "maxPageLinks": "maxPageLinks"; "page": "page"; }, { "onSelectPage": "onSelectPage"; }, never, never>;
}
//# sourceMappingURL=pager.component.d.ts.map