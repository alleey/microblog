

export enum SortDirection {
    Asc = "asc",
    Desc = "desc",
  }

export interface Pageable {
    page: number,
    limit?: number,
    sort? : {
        [key: string]: SortDirection 
    }
}

export interface PageModel {
    number: number;
    size: number;
    totalElements: number;
    totalPages: number;
}
