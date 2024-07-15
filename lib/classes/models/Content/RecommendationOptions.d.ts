declare enum RecommendationFiltersJoinerRule {
    And = "AND",
    Or = "OR",
    Replace = "REPLACE"
}
declare class RecommendationOptions {
    slug: string | undefined;
    productID: string | undefined;
    itemsIds?: Array<string>;
    itemsExcluded?: Array<string>;
    additionalFilters?: string;
    filtersJoiner?: RecommendationFiltersJoinerRule;
    additionalElasticFilters?: string;
    elasticFiltersJoiner?: RecommendationFiltersJoinerRule;
    displayAttribute?: Array<string>;
    includeContextItems?: boolean;
    toObject(): object;
}
export { RecommendationOptions, RecommendationFiltersJoinerRule };
