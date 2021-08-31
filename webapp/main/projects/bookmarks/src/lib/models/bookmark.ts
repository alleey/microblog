import { PageModel } from "utils";

export interface BookmarkModel {
    id: number;
    caption: string;
    url: string;
    createdOn: Date;
    lastAccessedOn: Date;
}

export interface BookmarkResponseModel extends BookmarkModel {}
export interface BookmarkListResponseModel {
    _embedded: {
        bookmarks: BookmarkModel[]
    },
    page: PageModel
}