"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionDiscountTypeToString = exports.PromotionDiscountTypeFromString = exports.PromotionDiscountType = void 0;
var PromotionDiscountType;
(function (PromotionDiscountType) {
    PromotionDiscountType["None"] = "NONE";
    PromotionDiscountType["Percent"] = "PERCENT";
    PromotionDiscountType["Amount"] = "AMOUNT";
    PromotionDiscountType["TwoForOne"] = "2_FOR_1";
    PromotionDiscountType["Points"] = "POINTS";
    PromotionDiscountType["Multibuy"] = "MULTIBUY";
    PromotionDiscountType["ExactPrice"] = "EXACT_PRICE";
})(PromotionDiscountType || (PromotionDiscountType = {}));
exports.PromotionDiscountType = PromotionDiscountType;
function PromotionDiscountTypeFromString(string) {
    if (string === PromotionDiscountType.Percent) {
        return PromotionDiscountType.Percent;
    }
    else if (string === PromotionDiscountType.Amount) {
        return PromotionDiscountType.Amount;
    }
    else if (string === PromotionDiscountType.TwoForOne) {
        return PromotionDiscountType.TwoForOne;
    }
    else if (string === PromotionDiscountType.Points) {
        return PromotionDiscountType.Points;
    }
    else if (string === PromotionDiscountType.Multibuy) {
        return PromotionDiscountType.Multibuy;
    }
    else if (string === PromotionDiscountType.ExactPrice) {
        return PromotionDiscountType.ExactPrice;
    }
    return PromotionDiscountType.None;
}
exports.PromotionDiscountTypeFromString = PromotionDiscountTypeFromString;
function PromotionDiscountTypeToString(type) {
    return type;
}
exports.PromotionDiscountTypeToString = PromotionDiscountTypeToString;
