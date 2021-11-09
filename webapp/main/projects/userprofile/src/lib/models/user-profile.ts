import { PageModel } from "utils";

export interface UserProfileModel {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    about: string;
    createdOn: Date;
}

export interface UserProfileResponseModel extends UserProfileModel {
}
export interface UserProfileListResponseModel {
    _embedded: {
        UserProfiles: UserProfileModel[]
    },
    page: PageModel
}