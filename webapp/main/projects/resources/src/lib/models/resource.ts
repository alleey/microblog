import { HateosLink, PageModel } from "utils";

export interface ResourceModel {
    resource: string;
    key: string;
    owner: string;
    contentType: string;
    createdOn: Date;
    updateOn?: Date;
}

export interface ResourceResponseModel extends ResourceModel {
    _links?: {
        [key: string]: HateosLink
    };
}

export interface ResourceListResponseModel {
    _embedded: {
        resources: ResourceModel[]
    },
    page: PageModel
}
