import { PageModel } from "utils";

export interface CommentModel {
    id: number;
    text: string;
    owner: string;
    createdOn: Date;
    updateOn?: Date;
}

export interface CommentResponseModel extends CommentModel {
}

export interface CommentsResponseModel {
    _embedded: {
        comments: CommentModel[]
    },
    page: PageModel
}
