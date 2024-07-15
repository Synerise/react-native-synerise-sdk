declare class ScreenViewApiQuery {
    feedSlug: string;
    productId?: string | null;
    constructor(feedSlug: string, productId?: string | null);
    toObject(): {
        feedSlug: string;
        productId: string | null | undefined;
    };
}
export { ScreenViewApiQuery };
