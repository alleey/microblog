import { PageModel } from "utils";

export interface UserProfileModel {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}

export interface UserProfileResponseModel extends UserProfileModel {
}
export interface UserProfilesResponseModel {
    _embedded: {
        UserProfiles: UserProfileModel[]
    },
    page: PageModel
}