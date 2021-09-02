import { PageModel } from "utils";

export interface FollowsModel {
    userId: string;
    followedById?: string;
}
export interface FollowsResponseModel extends FollowsModel {}
export interface FollowsListResponseModel {
    _embedded: {
        follows: FollowsModel[]
    },
    page: PageModel
}
