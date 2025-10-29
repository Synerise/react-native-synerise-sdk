declare class BrickworksApiQuery {
    schemaSlug: string;
    recordSlug?: string;
    recordId?: string;
    context?: object;
    fieldContext?: object;
    private constructor();
    static byRecordSlug(schemaSlug: string, recordSlug: string): BrickworksApiQuery;
    static byRecordId(schemaSlug: string, recordId: string): BrickworksApiQuery;
    toObject(): {
        schemaSlug: string;
        recordSlug: string | undefined;
        recordId: string | undefined;
        context: object | undefined;
        fieldContext: object | undefined;
    };
}
export { BrickworksApiQuery };
