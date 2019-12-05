declare enum ApiQuerySortingOrder {
    Ascending = "asc",
    Descending = "desc"
}
interface IApiQuerySorting {
    property: string;
    order: ApiQuerySortingOrder;
}
declare class BaseApiQuery {
    limit: number;
    page: number;
    sorting: Array<IApiQuerySorting>;
    includeMeta: boolean;
}
export { BaseApiQuery, IApiQuerySorting, ApiQuerySortingOrder };
