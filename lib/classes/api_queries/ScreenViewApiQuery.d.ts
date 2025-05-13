declare class ScreenViewApiQuery {
    feedSlug: string;
    productId?: string | null;
    params?: object | null;
    constructor(feedSlug: string, productId?: string | null);
    toObject(): {
        feedSlug: string;
        productId: string | null | undefined;
        params: object | null | undefined;
    };
}
export { ScreenViewApiQuery };
