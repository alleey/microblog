import { PageModel } from "utils";

export interface TopicModel {
    id: number;
    caption: string;
}

export interface TopicResponseModel extends TopicModel {
}
export interface TopicListResponseModel {
    _embedded: {
        topics: TopicModel[]
    },
    page: PageModel
}