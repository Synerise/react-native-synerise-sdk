"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionActivationOptions = void 0;
var PromotionActivationOptions = /** @class */ (function () {
    function PromotionActivationOptions(identifier) {
        this.identifier = identifier;
    }
    PromotionActivationOptions.prototype.toObject = function () {
        return {
            identifier: this.identifier.toObject(),
            pointsToUse: this.pointsToUse,
        };
    };
    return PromotionActivationOptions;
}());
exports.PromotionActivationOptions = PromotionActivationOptions;
