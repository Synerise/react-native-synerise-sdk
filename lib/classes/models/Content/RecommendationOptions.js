"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationFiltersJoinerRule = exports.RecommendationOptions = void 0;
var RecommendationFiltersJoinerRule;
(function (RecommendationFiltersJoinerRule) {
    RecommendationFiltersJoinerRule["And"] = "AND";
    RecommendationFiltersJoinerRule["Or"] = "OR";
    RecommendationFiltersJoinerRule["Replace"] = "REPLACE";
})(RecommendationFiltersJoinerRule || (RecommendationFiltersJoinerRule = {}));
exports.RecommendationFiltersJoinerRule = RecommendationFiltersJoinerRule;
var RecommendationOptions = /** @class */ (function () {
    function RecommendationOptions() {
    }
    RecommendationOptions.prototype.toObject = function () {
        return {
            slug: this.slug,
            productID: this.productID,
            itemsIds: this.itemsIds,
            itemsExcluded: this.itemsExcluded,
            additionalFilters: this.additionalFilters,
            filtersJoiner: this.filtersJoiner,
            additionalElasticFilters: this.additionalElasticFilters,
            elasticFiltersJoiner: this.elasticFiltersJoiner,
            displayAttribute: this.displayAttribute,
            includeContextItems: this.includeContextItems
        };
    };
    return RecommendationOptions;
}());
exports.RecommendationOptions = RecommendationOptions;
