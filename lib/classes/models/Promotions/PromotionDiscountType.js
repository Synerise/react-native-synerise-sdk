"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromotionDiscountType;
(function (PromotionDiscountType) {
    PromotionDiscountType["None"] = "NONE";
    PromotionDiscountType["Percent"] = "PERCENT";
    PromotionDiscountType["Amount"] = "AMOUNT";
    PromotionDiscountType["TwoForOne"] = "2_FOR_1";
    PromotionDiscountType["Points"] = "POINTS";
    PromotionDiscountType["Multibuy"] = "MULTIBUY";
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
    return PromotionDiscountType.None;
}
exports.PromotionDiscountTypeFromString = PromotionDiscountTypeFromString;
function PromotionDiscountTypeToString(promotionDiscountType) {
    return promotionDiscountType;
}
exports.PromotionDiscountTypeToString = PromotionDiscountTypeToString;
