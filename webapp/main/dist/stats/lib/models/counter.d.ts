import { PageModel } from "utils";
export interface CounterModel {
    counter: string;
    owner: string;
    value: number;
}
export interface CounterResponseModel extends CounterModel {
}
export interface CounterListResponseModel {
    _embedded: {
        counters: CounterModel[];
    };
    page: PageModel;
}
