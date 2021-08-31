import { Pipe } from '@angular/core';
import * as moment from 'moment';
import * as i0 from "@angular/core";
export class PrettyDatePipe {
    transform(value) {
        return moment(value).calendar();
    }
}
PrettyDatePipe.ɵfac = function PrettyDatePipe_Factory(t) { return new (t || PrettyDatePipe)(); };
PrettyDatePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "prettyDate", type: PrettyDatePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PrettyDatePipe, [{
        type: Pipe,
        args: [{
                name: 'prettyDate'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldHR5LWRhdGUucGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3V0aWxzL3NyYy9saWIvcGlwZXMvcHJldHR5LWRhdGUucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsSUFBSSxFQUFpQixNQUFNLGVBQWUsQ0FBQztBQUNwRCxPQUFPLEtBQUssTUFBTSxNQUFNLFFBQVEsQ0FBQzs7QUFLakMsTUFBTSxPQUFPLGNBQWM7SUFFekIsU0FBUyxDQUFDLEtBQTJCO1FBQ25DLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xDLENBQUM7OzRFQUpVLGNBQWM7aUZBQWQsY0FBYzt1RkFBZCxjQUFjO2NBSDFCLElBQUk7ZUFBQztnQkFDSixJQUFJLEVBQUUsWUFBWTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdwcmV0dHlEYXRlJ1xufSlcbmV4cG9ydCBjbGFzcyBQcmV0dHlEYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHRyYW5zZm9ybSh2YWx1ZTogRGF0ZSB8IG1vbWVudC5Nb21lbnQpOiBzdHJpbmcge1xuICAgIHJldHVybiBtb21lbnQodmFsdWUpLmNhbGVuZGFyKCk7XG4gIH1cblxufVxuIl19