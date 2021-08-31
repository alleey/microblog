import { PageModel } from "utils";
export interface FollowedByModel {
    userId: string;
    userName: string;
    followedById: string;
    followedByName: string;
}
export interface FollowedByResponseModel extends FollowedByModel {
}
export interface FollowedByListResponseModel {
    _embedded: {
        followedBy: FollowedByModel[];
    };
    page: PageModel;
}
