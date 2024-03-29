"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionDiscountModeFromString = exports.PromotionDiscountModeToString = exports.PromotionDiscountMode = void 0;
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
function PromotionDiscountModeToString(mode) {
    return mode;
}
exports.PromotionDiscountModeToString = PromotionDiscountModeToString;
