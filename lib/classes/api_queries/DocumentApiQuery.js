"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentApiQuery = void 0;
var DocumentApiQuery = /** @class */ (function () {
    function DocumentApiQuery(slug) {
        this.slug = slug;
    }
    DocumentApiQuery.prototype.toObject = function () {
        return {
            slug: this.slug,
            productId: this.productId,
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
    return DocumentApiQuery;
}());
exports.DocumentApiQuery = DocumentApiQuery;
