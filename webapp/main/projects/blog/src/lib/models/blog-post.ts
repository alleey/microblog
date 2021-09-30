import { PageModel } from "utils";

export interface BlogPostModel {
    id: number;
    slug: string;
    title: string;
    text: string;
    owner: string;
    createdOn: Date;
    updateOn?: Date;
    permalink: string;
    topics?: any
}

export interface BlogPostResponseModel extends BlogPostModel {
    comments?: any,
}

export interface BlogPostListResponseModel {
    _embedded: {
        posts: BlogPostModel[]
    },
    page: PageModel
}