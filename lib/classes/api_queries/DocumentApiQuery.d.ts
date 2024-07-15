import { RecommendationFiltersJoinerRule } from '../models/Content/RecommendationOptions';
declare class DocumentApiQuery {
    slug: string;
    productId?: string;
    itemsIds?: Array<string>;
    itemsExcluded?: Array<string>;
    additionalFilters?: string;
    filtersJoiner?: RecommendationFiltersJoinerRule;
    additionalElasticFilters?: string;
    elasticFiltersJoiner?: RecommendationFiltersJoinerRule;
    displayAttribute?: Array<string>;
    includeContextItems?: boolean;
    constructor(slug: string);
    toObject(): {
        slug: string;
        productId: string | undefined;
        itemsIds: string[] | undefined;
        itemsExcluded: string[] | undefined;
        additionalFilters: string | undefined;
        filtersJoiner: RecommendationFiltersJoinerRule | undefined;
        additionalElasticFilters: string | undefined;
        elasticFiltersJoiner: RecommendationFiltersJoinerRule | undefined;
        displayAttribute: string[] | undefined;
        includeContextItems: boolean | undefined;
    };
}
export { DocumentApiQuery };
