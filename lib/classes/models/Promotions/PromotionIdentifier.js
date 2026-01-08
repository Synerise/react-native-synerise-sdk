"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionIdentifier = void 0;
var PromotionIdentifier = /** @class */ (function () {
    function PromotionIdentifier(key, value) {
        this.key = key;
        this.value = value;
    }
    PromotionIdentifier.prototype.toObject = function () {
        return {
            key: this.key,
            value: this.value,
        };
    };
    return PromotionIdentifier;
}());
exports.PromotionIdentifier = PromotionIdentifier;
