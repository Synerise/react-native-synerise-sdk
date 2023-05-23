"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RecommendationOptions = /** @class */ (function () {
    function RecommendationOptions() {
    }
    RecommendationOptions.prototype.toObject = function () {
        return {
            slug: this.slug,
            productID: this.productID,
        };
    };
    return RecommendationOptions;
}());
exports.RecommendationOptions = RecommendationOptions;
