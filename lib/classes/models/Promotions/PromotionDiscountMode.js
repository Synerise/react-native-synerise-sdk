"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromotionDiscountMode;
(function (PromotionDiscountMode) {
    PromotionDiscountMode["Static"] = "STATIC";
    PromotionDiscountMode["Step"] = "STEP";
})(PromotionDiscountMode || (PromotionDiscountMode = {}));
exports.PromotionDiscountMode = PromotionDiscountMode;
function PromotionDiscountModeFromString(string) {
    if (string === PromotionDiscountMode.Static) {
        return PromotionDiscountMode.Static;
    }
    else if (string === PromotionDiscountMode.Step) {
        return PromotionDiscountMode.Step;
    }
    return PromotionDiscountMode.Static;
}
exports.PromotionDiscountModeFromString = PromotionDiscountModeFromString;
function PromotionDiscountModeToString(promotionItemScope) {
    return promotionItemScope;
}
exports.PromotionDiscountModeToString = PromotionDiscountModeToString;
