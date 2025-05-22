"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScreenViewApiQuery = void 0;
var ScreenViewApiQuery = /** @class */ (function () {
    function ScreenViewApiQuery(feedSlug, productId) {
        this.feedSlug = feedSlug;
        this.productId = productId;
    }
    ScreenViewApiQuery.prototype.toObject = function () {
        return {
            feedSlug: this.feedSlug,
            productId: this.productId,
        };
    };
    return ScreenViewApiQuery;
}());
exports.ScreenViewApiQuery = ScreenViewApiQuery;
