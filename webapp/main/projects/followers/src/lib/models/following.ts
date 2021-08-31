import { PageModel } from "utils";

export interface FollowingModel {
    userId: string;
    userName: string;
    followedById?: string;
    followedByName?: string;
}
export interface FollowingResponseModel extends FollowingModel {}
export interface FollowingListResponseModel {
    _embedded: {
        following: FollowingModel[]
    },
    page: PageModel
}
