"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionDiscountUsageTriggerToString = exports.PromotionDiscountUsageTriggerFromString = exports.PromotionDiscountUsageTrigger = void 0;
var PromotionDiscountUsageTrigger;
(function (PromotionDiscountUsageTrigger) {
    PromotionDiscountUsageTrigger["Transaction"] = "TRANSACTION";
    PromotionDiscountUsageTrigger["Redeem"] = "REDEEM";
})(PromotionDiscountUsageTrigger || (PromotionDiscountUsageTrigger = {}));
exports.PromotionDiscountUsageTrigger = PromotionDiscountUsageTrigger;
function PromotionDiscountUsageTriggerFromString(string) {
    if (string === PromotionDiscountUsageTrigger.Transaction) {
        return PromotionDiscountUsageTrigger.Transaction;
    }
    else if (string === PromotionDiscountUsageTrigger.Redeem) {
        return PromotionDiscountUsageTrigger.Redeem;
    }
    return PromotionDiscountUsageTrigger.Transaction;
}
exports.PromotionDiscountUsageTriggerFromString = PromotionDiscountUsageTriggerFromString;
function PromotionDiscountUsageTriggerToString(promotionItemScope) {
    return promotionItemScope;
}
exports.PromotionDiscountUsageTriggerToString = PromotionDiscountUsageTriggerToString;
