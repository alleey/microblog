import { PageModel } from "utils";
export interface CounterStatisticsModel {
    counter: string;
    statistics: {
        count: number;
        min: number;
        max: number;
        sum: number;
        avg: number;
    };
}
export interface CounterStatisticsResponseModel extends CounterStatisticsModel {
}
export interface CounterStatisticsListResponseModel {
    _embedded: {
        following: CounterStatisticsModel[];
    };
    page: PageModel;
}
